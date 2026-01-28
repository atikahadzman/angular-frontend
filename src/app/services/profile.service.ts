import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/users';

    // READ ALL
    getAll(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this.apiUrl);
    }

    // READ BY ID
    getById(id: string): Observable<Profile> {
        return this.http.get<Profile>(`${this.apiUrl}/${id}`);
    }
}
