import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    user = {
        name: 'John Doe',
        profileImage: 'https://i.pravatar.cc/300'
    };

    logout() {
        console.log('Logging out...');
    }
}
