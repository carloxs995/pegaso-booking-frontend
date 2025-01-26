import { Routes } from '@angular/router';
import { AdminAreaHomeComponent } from './components/admin/admin-area-home/admin-area-home.component';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';
import { UserRole } from './models/user.model';
import { RoomsHomeComponent } from './components/rooms/rooms-home.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { BookingCreationComponent } from './components/bookings/booking-creation/booking-creation.component';

export const routes: Routes = [
    {
        path: '',
        component: RoomsHomeComponent,
    },
    {
        path: 'rooms/:id',
        component: RoomDetailsComponent
    },
    {
        path: 'bookings',
        canActivateChild: [
            () => !!inject(AuthenticationService).currentUserData$.value
        ],
        children: [
            {
                path: 'create/:roomId',
                component: BookingCreationComponent
            }
        ]
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
