import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, from, map, Observable, tap, throwError } from 'rxjs';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseBackendService } from './firebase-backend.service';
import { UserDetails, UserRegistration } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    readonly currentUserData$: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null);

    private _auth: Auth = getAuth();

    private readonly _firebaseBackendService: FirebaseBackendService = inject(FirebaseBackendService);

    loginWithEmail(credentials: { username: string, password: string }): Observable<UserDetails> {
        return from(signInWithEmailAndPassword(this._auth, credentials.username, credentials.password))
            .pipe(
                concatMap(() => this.getUserInfo()),
                catchError(e => {
                    console.error(`login With Email ${e}`);
                    return throwError(() => e);
                })
            );
    }

    getUserInfo(): Observable<UserDetails> {
        return this._firebaseBackendService.get<{ data: UserDetails }>('/users/me')
            .pipe(
                map(res => res.data),
                tap(userDetails => this.currentUserData$.next(userDetails))
            );
    }

    createUser(request: UserRegistration): Observable<UserDetails> {
        return this._firebaseBackendService.post('/users', request)
            .pipe(
                concatMap(() => this.loginWithEmail({ username: request.email, password: request.password }))
            );
    }
}
