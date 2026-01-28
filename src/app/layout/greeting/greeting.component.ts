import { Component, Input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MaterialModule } from '../../material.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-greeting',
    imports: [
        MaterialModule, 
        MatBadgeModule,
        MatCardModule,
        MatIconModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './greeting.component.html',
    styleUrl: './greeting.component.css'
})
export class GreetingComponent implements OnInit {
    userName: string = '';

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        const user = this.auth.getUser();
        this.userName = user?.username || 'User';
    }
}
