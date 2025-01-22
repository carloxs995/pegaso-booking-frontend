import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    isLogged: boolean = false;

    constructor(private dialog: MatDialog) {

    }
    user = {
        name: 'John Doe',
        profileImage: 'https://i.pravatar.cc/300'
    };

    logout() {
        console.log('Logging out...');
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(
            LoginComponent, {
            width: '400px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Login modal closed');
        });
    }
}
