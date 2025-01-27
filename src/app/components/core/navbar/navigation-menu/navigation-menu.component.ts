import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'navigation-menu',
    imports: [MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
    template: `
        <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="navigateTo('/')">
            <mat-icon>home</mat-icon>
            Home
        </button>
        <button mat-menu-item (click)="navigateTo('/bookings')">
        <mat-icon>list</mat-icon>
                    Lista Prenotazioni
        </button>
    </mat-menu>
  `,
})
export class NavigationMenuComponent {

    private readonly _router: Router = inject(Router);

    navigateTo(route: string): void {
        this._router.navigate([route]);
    }
}
