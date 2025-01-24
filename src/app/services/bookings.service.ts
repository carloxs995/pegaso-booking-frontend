import { inject, Injectable } from '@angular/core';
import { FirebaseBackendService } from './firebase-backend.service';
import { IBookingListResponse, IBookingsFiltersListSchema } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    getBookingsList(filters: IBookingsFiltersListSchema): Observable<IBookingListResponse> {
        return this._firebaseBackendService.get('/bookings', filters);
    }

    confirmPayment(id: string): Observable<void> {
        return this._firebaseBackendService.put(`/bookings/${id}/confirm`);
    }

    deleteBooking(id: string): Observable<void> {
        return this._firebaseBackendService.delete(`/bookings/${id}`);
    }
}
