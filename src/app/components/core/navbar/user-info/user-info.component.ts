import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from '../../../../services/authentication.service';
import { LoginComponent } from '../../login/login.component';
import { getAuth } from 'firebase/auth';
import { UserRole } from '../../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    selector: 'user-info',
    imports: [MatMenuModule, MatIconModule, CommonModule, MatButtonModule],
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container *ngIf="authenticationService.currentUserData$ | async as currentUserData; else loginButton">
            <span>{{ currentUserData.firstName + ' ' + currentUserData.lastName }}</span>
            <button mat-icon-button [matMenuTriggerFor]="userMenu">
                <img [src]="'https://i.pravatar.cc/300'" alt="User Avatar" class="avatar"> <!-- TODO: retrieve avatar from BE -->
            </button>
            <mat-menu #userMenu="matMenu">
                <button mat-menu-item (click)="navigateTo('userSettings')">
                    <mat-icon>account_circle</mat-icon>
                    Profile
                </button>
                <button mat-menu-item *ngIf="currentUserData.role === UserRole.ADMIN" (click)="navigateTo('admin')">
                    <mat-icon>settings</mat-icon>
                    Admin Area
                </button>
                <button mat-menu-item (click)="logout()">
                    <mat-icon>logout</mat-icon>
                    Logout
                </button>
            </mat-menu>
        </ng-container>
        <ng-template #loginButton>
            <button mat-raised-button color="accent" (click)="openLoginDialog()">Login</button>
        </ng-template>
  `,
    styles: `
      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;

        span {
            font-weight: bold;
            font-size: 16px;
        }

        .avatar {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid white;
        }
    }
    @media (max-width: 768px) {
        .user-info {
            flex-direction: row;

            span {
                display: none; // Nasconde il nome utente su schermi piccoli
            }
        }
    }
    `
})
export class UserInfoComponent {

    @HostBinding('className') className = 'user-info';

    isLogged: boolean = false;

    readonly UserRole = UserRole;
    private readonly _dialog: MatDialog = inject(MatDialog);
    private readonly _router: Router = inject(Router);
    authenticationService: AuthenticationService = inject(AuthenticationService);

    logout() {
        getAuth().signOut()
            .then(() => window.location.reload())
            .catch(e => console.log(e));
    }

    openLoginDialog(): void {
        const dialogRef = this._dialog.open(
            LoginComponent,
            {
                width: '400px',
                disableClose: true
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log('Login modal closed');
        });
    }

    navigateTo(type: 'admin' | 'userSettings') {
        console.log('ci sono');
        const url = type === 'admin' ? '/admin' : '/user';
        this._router.navigate([url]);
    }
}
