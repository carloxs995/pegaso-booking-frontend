import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { lastValueFrom, withLatestFrom } from 'rxjs';
import { FooterComponent } from './components/core/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        CommonModule,
        FooterComponent
    ],
    template: `
        @if(!isLoading) {
            <navbar />
            <div class="content">
                <router-outlet />
            </div>
            <!-- <app-footer /> -->
        }
    `,
    styles: `
            html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Roboto, "Helvetica Neue", sans-serif;
        }

        app-root {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .content {
            display: flex;
            flex-flow: column;
            height: 100%;
            flex-grow: 1;
            padding-top: 64px; //NavBar height
        }
    `,
    encapsulation: ViewEncapsulation.None
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
