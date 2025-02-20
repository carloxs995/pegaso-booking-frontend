import { inject, Injectable } from '@angular/core';
import { FirebaseBackendService } from './firebase-backend.service';
import { Observable } from 'rxjs';
import { IRoomDetails, IRoomsAvailability, RoomFilters } from '../models/room.models';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    getRoomsList(filters?: RoomFilters): Observable<{ data: IRoomDetails[] }> {
        return this._firebaseBackendService.get('/rooms', filters);
    }

    createRoom(roomModel: IRoomDetails): Observable<void> {
        return this._firebaseBackendService.post('/rooms', roomModel);
    }

    updateRoom(roomModel: IRoomDetails): Observable<void> {
        return this._firebaseBackendService.put(`/rooms/${roomModel.id}`, roomModel);
    }

    getRoomDetails(id: string): Observable<IRoomDetails> {
        return this._firebaseBackendService.get(`/rooms/${id}`);
    }

    checkAvailability(id: string, checkInDate: string, checkOutDate: string, quantityGuests: number): Observable<{ data: IRoomsAvailability }> {
        return this._firebaseBackendService.get(`/rooms/check-availability/${id}`, { checkInDate, checkOutDate, quantityGuests });
    }
}
