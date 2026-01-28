import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress';
import { Book } from '../models/books';

@Injectable({
  providedIn: 'root',
})

export class ProgressService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/readingprogress';
    private bookUrl = 'http://localhost:8080/api/books';

    // READ ALL
    getAll(): Observable<Progress[]> {
        return this.http.get<Progress[]>(this.apiUrl);
    }

    // READ BY ID
    getById(id: string): Observable<Progress> {
        return this.http.get<Progress>(`${this.apiUrl}/${id}`);
    }
    
    // BOOK BY ID
    getBook(book_id: string): Observable<Book> {
        return this.http.get<Book>(`${this.bookUrl}/${book_id}`);
    }

    // SAVE PROGRESS
    saveProgress(progress: Partial<Progress>): Observable<Progress> {
        if (progress.id) {
            return this.http.put<Progress>(`${this.apiUrl}/${progress.id}`, progress);
        }
        return this.http.post<Progress>(this.apiUrl, progress);
    }
}
