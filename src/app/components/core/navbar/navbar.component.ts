import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [MatToolbarModule, NavigationMenuComponent, UserInfoComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    isLogged: boolean = false;

    private readonly _dialog: MatDialog = inject(MatDialog);
    authenticationService: AuthenticationService = inject(AuthenticationService);
    private readonly router: Router = inject(Router);

    navigateToHome(): void {
        this.router.navigate(['/']);
    }
}
