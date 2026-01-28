import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/books';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {

  book: Book = {
    title: '',
    author: '',
    totalPages: 0,
    status: '',
    description: '',
  };

  selectedImage?: File;
  selectedPdf?: File;
  preview?: string;
  isEdit = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.bookService.getById(id).subscribe((book) => {
        this.book = book;
        this.preview = book.coverImage
          ? `http://localhost:3000/${book.coverImage}`
          : undefined;
      });
    }
  }

  onImageSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }

  onPdfSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedPdf = file;
  }

  save(): void {
    if (!this.selectedImage && !this.isEdit) {
      alert('Cover image required');
      return;
    }

    // const request$ = this.isEdit
    //   ? this.bookService.update(this.book.id!, this.book, this.selectedImage, this.selectedPdf)
    //   : this.bookService.create(this.book, this.selectedImage!, this.selectedPdf!);
    const request$ = this.bookService.create(this.book, this.selectedImage!, this.selectedPdf!);

    request$.subscribe(() => {
      this.router.navigate(['/books']);
    });
  }
}

