import { Routes } from '@angular/router';
import { AdminAreaHomeComponent } from './components/admin/admin-area-home/admin-area-home.component';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';
import { UserRole } from './models/user.model';
import { RoomsHomeComponent } from './components/rooms/rooms-home.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { BookingManageComponent } from './components/bookings/booking-manage/booking-manage.component';

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
        children: [
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
    }
];
