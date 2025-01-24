import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'navigation-menu',
    imports: [MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
    template: `
        <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/home">
            <mat-icon>home</mat-icon>
            Home
        </button>
        <button mat-menu-item routerLink="/about">
            <mat-icon>info</mat-icon>
            About Us
        </button>
        <button mat-menu-item routerLink="/services">
            <mat-icon>build</mat-icon>
            Services
        </button>
        <button mat-menu-item routerLink="/contact">
            <mat-icon>contacts</mat-icon>
            Contact
        </button>
    </mat-menu>
  `,
})
export class NavigationMenuComponent {

}
