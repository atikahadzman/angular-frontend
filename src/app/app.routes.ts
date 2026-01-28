import { provideRouter, Routes } from '@angular/router';
import { GreetingComponent } from './layout/greeting/greeting.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
// import { RegisterComponent } from './pages/register/register.component';
import { BooksComponent } from './pages/books.component';
import { ProfileComponent } from './pages/profile.component';
import { ProgressComponent } from './pages/progress.component';

// authentication
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { BooksReaderComponent } from './pages/books-reader.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'books/new', component: BookFormComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'books/:id/read', component: BooksReaderComponent },
      { path: '', redirectTo: 'books', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
