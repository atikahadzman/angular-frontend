import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books';

@Injectable({
  providedIn: 'root',
})

export class BookService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/books';

  // READ ALL
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // READ BY ID
  getById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  create(book: Book, image: File, pdf: File) {
    const formData = new FormData();

    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('totalPages', book.totalPages.toString());
    formData.append('status', book.status);
    formData.append('description', book.description);

    if (image) {
      formData.append('coverImage', image);
    }

    if (pdf) {
      formData.append('bookFile', pdf);
    }

    return this.http.post<Book>(this.apiUrl, formData);
  }

  // UPDATE
  update(id: string, book: Book, image?: File, pdf?: File) {
    const formData = new FormData();

    Object.entries(book).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (image) formData.append('coverImage', image);
    if (pdf) formData.append('bookFile', pdf);

    return this.http.put<Book>(`${this.apiUrl}/${id}`, formData);
  }

  // DELETE
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
