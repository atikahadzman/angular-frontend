import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule
    ],
    template: `
        <h1>Profile</h1>

        <ul *ngIf="profile; else loading">
            <li *ngFor="let profile of profile">
                {{ profile.name }} - {{ profile.email }}
            </li>
        </ul>

        <ng-template #loading>
            <p>Loading profiles...</p>
        </ng-template>
    `
})
export class ProfileComponent implements OnInit {
    profile: Profile[] = [];

    constructor(private profileService: ProfileService) {}

    ngOnInit() {
        this.profileService.getAll().subscribe(data => {
            this.profile = data;
        });
    }
}
