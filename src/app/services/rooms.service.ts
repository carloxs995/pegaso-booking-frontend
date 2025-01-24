import { inject, Injectable } from '@angular/core';
import { FirebaseBackendService } from './firebase-backend.service';
import { Observable } from 'rxjs';
import { IRoomDetails } from '../models/room.models';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    getRoomsList(): Observable<{ data: IRoomDetails[] }> {
        return this._firebaseBackendService.get('/rooms');
    }

    createRoom(roomModel: IRoomDetails): Observable<void> {
        return this._firebaseBackendService.post('/rooms', roomModel);
    }

    updateRoom(roomModel: IRoomDetails): Observable<void> {
        return this._firebaseBackendService.put(`/rooms/${roomModel.id}`, roomModel);
    }

    getRoomDetails(id: string): Observable<IRoomDetails> {
        return this._firebaseBackendService.get(`/rooms/${id}/details`);
    }
}
