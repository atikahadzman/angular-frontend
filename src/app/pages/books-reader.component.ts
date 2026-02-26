import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { ProgressService } from '../services/progress.service';
import { Book } from '../models/books';
import { Progress } from '../models/progress';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-books-reader',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    MatButtonModule,
  ],
  templateUrl: './books-reader.component.html',
  styleUrl: './books-reader.component.css',
})
export class BooksReaderComponent implements OnInit {
  pdfUrl?: string | Blob;
  pdfKey = 0;
  pdfTitle?: string;
  bookId?: string;
  id?: string;

  currentPage = 1;
  totalPages = 1;
  // set default value for redirect the last page user read
  lastPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private progressService: ProgressService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef, // enable PDF load
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || undefined;
    if (!this.bookId) return;

    this.route.queryParamMap.subscribe(q => {
      const page = q.get('page');
      this.currentPage = page ? + page : 1;

      this.id = q.get('id') ?? undefined;
      console.log('=== progress id === '+ this.id);
    });

    this.bookService.getById(this.bookId).subscribe(book => {
      if (book.bookUrl) {
        this.pdfUrl = `http://localhost:8080/uploads/${book.bookUrl}`;
        this.pdfTitle = book.title;
        this.totalPages = book.totalPages;
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onPdfLoad(event: any) {
    this.totalPages = event.pagesCount;
  }

  jumpToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  bookmarkPage() {
    const userId = this.authService.getUserId();

    if (!this.bookId) {
      return;
    }

    const progress: Partial<Progress> = {
      id: this.id,
      bookId: this.bookId,
      userId: userId,
      currentPage: this.currentPage,
      lastReadAt: Date.now(),
    };

    this.progressService.saveProgress(progress).subscribe({
      next: () => alert(`Bookmark saved: Page ${this.currentPage}`),
      error: (err) => console.error('Failed to save bookmark', err)
    });
  }

  loadBookmark() {
    const userId = this.authService.getUserId();

    if (!this.bookId) {
      return;
    }

    this.progressService.getAll().subscribe(progressList => {
      const bookmark = progressList.find(p => p.bookId === this.bookId && p.userId === userId);

      if (bookmark) {
        console.log('bookmark:' + JSON.stringify(bookmark));
        this.currentPage = bookmark.currentPage;
      }
    });
  }
}
