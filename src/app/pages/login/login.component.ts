import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {
  }

  login() {
    const credentials = { 
      username: this.username, 
      password: this.password 
    };

    this.auth.login(credentials).subscribe({
      next: () => {
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
        console.log('username: ' + this.username);
        this.router.navigate(['/books']);
      },
      error: (err: any) => {
        console.error('Login failed', err);
        alert('Login failed');
      }
    });
  }
}
