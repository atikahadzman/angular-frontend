import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id?: string;
  username: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user?: any;

    private apiUrl = 'http://localhost:8080/api/auth/';
    id: any;
    username: any;
    message: any;

    constructor(private http: HttpClient) {}

    login(credentials: { username: string; password: string }): Observable<string> {
        return this.http
            .post(this.apiUrl + 'login', credentials, { responseType: 'text' })
            .pipe(
            tap(response => {
                const data = JSON.parse(response);

                this.id = data.id;
                this.username = data.username;
                this.message = data.message;

                 this._user = {
                    id: data.id,
                    username: data.username,
                    message: data.message
                };

                sessionStorage.setItem('user', JSON.stringify(this._user));
            })
        );
    }

    logout() {
        this._user = undefined;
        localStorage.removeItem('user');
        sessionStorage.clear();
    }

    isLoggedIn(): boolean {
        return !!this._user || !!localStorage.getItem('user');
    }

    getUser() {
        if (this._user) return this._user;

        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                this._user = JSON.parse(storedUser);
                return this._user;
            } catch (err) {
                console.error('Failed to parse stored user', err);
                sessionStorage.removeItem('user');
            }
        }
        return null;
    }


    getUserId() {
        return this.getUser()?.id || null;
    }
}
