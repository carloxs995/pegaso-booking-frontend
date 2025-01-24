import { Injectable } from '@angular/core';
import { FirebaseBackendService } from './firebase-backend.service';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    getBookingsList(filters: IBookingFilters): Observable<{ data: IBookingsDetails[] }> {
        return this._firebaseBackendService.get('/bookings', filters);
    }
}
