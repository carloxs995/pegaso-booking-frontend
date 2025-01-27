import { inject, Injectable } from '@angular/core';
import { FirebaseBackendService } from './firebase-backend.service';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    getUsersList(pageSize: number = 50, pageToken?: string): Observable<{ data: { items: UserDetails[], pageToken: string | undefined } }> {
        return this._firebaseBackendService.get('/users', { pageSize, pageToken });
    }
}
