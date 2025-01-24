import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { lastValueFrom, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        CommonModule
    ],
    template: `
        <ng-container *ngIf="!isLoading">
            <navbar />
            <div class="content">
                <router-outlet />
            </div>
        <ng-container>
    `,
    styles: `
        .content {
            margin-top: 64px; //NavBar height
        }
    `
})
export class AppComponent {
    isLoading: boolean = true;

    private readonly _authenticationService: AuthenticationService = inject(AuthenticationService)

    constructor() {
        onAuthStateChanged(getAuth(), async (user) => {
            console.log(user);
            if (user) {
                await lastValueFrom(this._authenticationService.getUserInfo());
            }
            this.isLoading = false;
        })
    }
}
