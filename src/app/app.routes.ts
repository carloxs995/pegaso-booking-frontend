import { Routes } from '@angular/router';
import { AdminAreaHomeComponent } from './components/admin/admin-area-home/admin-area-home.component';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';
import { UserRole } from './models/user.model';
import { RoomsHomeComponent } from './components/rooms/rooms-home.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { BookingManageComponent } from './components/bookings/booking-manage/booking-manage.component';
import { BookingsListComponent } from './components/bookings/bookings-list/bookings-list.component';

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
                path: '',
                component: BookingsListComponent,
            },
            {
                path: 'create/:roomId',
                component: BookingManageComponent,
                data: {
                    isEditing: false
                }
            },
            {
                path: 'edit/:bookingId',
                component: BookingManageComponent,
                data: {
                    isEditing: true
                }
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
    },
    {
        path: '*',
        redirectTo: '/'
    }
];
