import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ProgressService } from '../services/progress.service';
import { Progress } from '../models/progress';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule, 
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatTableModule,
    MatProgressBarModule,
    RouterModule,
  ],
  templateUrl: './progress.component.html',
})
export class ProgressComponent implements OnInit {
  progress$!: Observable<Progress[]>;
  displayedColumns: string[] = ['title', 'progress', 'status', 'action'];
  id?: string;

  constructor(
    private progresService: ProgressService,
    private route: ActivatedRoute,
  ) {
    this.progress$ = this.progresService.getAll();
  }

  ngOnInit(): void {
    this.progress$ = this.progresService.getAll().pipe(
      switchMap((progresses) => {
        const requests = progresses.map((p) => {
          return this.progresService.getBook(p.bookId).pipe(
            map((book) => ({ ...p, book }))
          );
        });

        return forkJoin(requests);
      })
    );
  }

  delete(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this progress?');

    if (!confirmed) {
      return;
    }

    this.progresService.delete(id).subscribe({
      next: () => {
        console.log('Progress deleted');
        window.location.reload();
      },
      error: (err) => {
        console.error('Delete failed', err);
        window.location.reload();
      }
    });
  }
}
