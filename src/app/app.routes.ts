import { Routes } from '@angular/router';
import { AdminAreaHomeComponent } from './components/admin/admin-area-home/admin-area-home.component';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';
import { UserRole } from './models/user.model';
import { RoomsHomeComponent } from './components/rooms/rooms-home.component';

export const routes: Routes = [
    {
        path: '',
        component: RoomsHomeComponent,
    },
    {
        path: 'admin',
        canActivateChild: [
            () => inject(AuthenticationService).currentUserData$.value?.role === UserRole.ADMIN
        ],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdminAreaHomeComponent
            }
        ]
    }
];
