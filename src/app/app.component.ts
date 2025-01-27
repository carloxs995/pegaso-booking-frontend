import { Component, inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { lastValueFrom, withLatestFrom } from 'rxjs';
import { FooterComponent } from './components/core/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from './services/sidenav.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        CommonModule,
        FooterComponent,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatIconModule
    ],
    template: `
        @if(!isLoading) {
            <mat-sidenav-container class="global-sidenav-container">
                <mat-sidenav #globalSidenav mode="over" position="end" [opened]="isSidenavOpen" [disableClose]="true">
                    <ng-container *ngIf="sidenavContent">
                        <ng-container *ngComponentOutlet="sidenavContent; injector: sidenavInjector"></ng-container>
                    </ng-container>
                </mat-sidenav>

                <mat-sidenav-content>
                    <navbar />
                    <div class="content">
                        <router-outlet />
                    </div>
                    <app-footer />

                    </mat-sidenav-content>
            </mat-sidenav-container>
        }

        @if(isLoading) {
            <div *ngIf="isLoading" class="loading-overlay">
                <mat-spinner diameter="50"></mat-spinner>
                <p>Carico la piattaforma...</p>
            </div>
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
            height: 100%
        }

        .content {
            display: flex;
            flex-flow: column;
            height: 100%;
            flex-grow: 1;
            padding-top: 64px; //NavBar height
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.8);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .global-sidenav-container {
             height: 100vh;
             height: 100%;
        }

        mat-sidenav {
            width: 500px;
            max-width: 100%;
        }

        .sidenav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #ddd;
        }

        .sidenav-header h2 {
            margin: 0;
            font-size: 1.5rem;
        }

    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    isLoading: boolean = true;

    private readonly _authenticationService: AuthenticationService = inject(AuthenticationService);
    readonly sideNavService: SidenavService = inject(SidenavService);

    isSidenavOpen = false;
    sidenavTitle = '';
    sidenavContent: any = null;
    sidenavData: any;
    sidenavInjector: Injector | undefined = undefined;

    constructor() {
        onAuthStateChanged(getAuth(), async (user) => {
            console.log(user);
            if (user) {
                await lastValueFrom(this._authenticationService.getUserInfo());
            }
            this.isLoading = false;
        })

        this.sideNavService.isSidenavOpen$.subscribe(isOpen => {
            console.log(isOpen);
            this.isSidenavOpen = isOpen
        });
        this.sideNavService.sidenavTitle$.subscribe(title => this.sidenavTitle = title);
        this.sideNavService.sidenavContent$.subscribe(content => this.sidenavContent = content);
        this.sideNavService.sidenavData$.subscribe(data => this.sidenavData = data);
        this.sideNavService.sidenavInjectorSubject$.subscribe(injector => this.sidenavInjector = injector);
    }
}
