import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { getAuth } from 'firebase/auth';

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    isLogged: boolean = false;

    private readonly _dialog: MatDialog = inject(MatDialog);
    authenticationService: AuthenticationService = inject(AuthenticationService);

    user = {
        name: 'John Doe',
        profileImage: 'https://i.pravatar.cc/300'
    };

    logout() {
        console.log('Logging out...');

        getAuth().signOut()
            .then(() => window.location.reload())
            .catch(e => console.log(e));


    }

    openLoginDialog(): void {
        const dialogRef = this._dialog.open(
            LoginComponent, {
            width: '400px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Login modal closed');
        });
    }
}
