import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../material.module';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    RouterLink, 
    RouterLinkActive,
    MatIconModule,   
    MatSidenavModule,
    MatToolbarModule,
    MaterialModule, 
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  showFiller = false;

  isDesktop = true;
drawer: any;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private breakpoint: BreakpointObserver
  ) {
    this.breakpoint.observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isDesktop = !result.matches;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
