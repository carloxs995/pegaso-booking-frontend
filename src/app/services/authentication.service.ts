import { Injectable } from '@angular/core';
import { catchError, concatMap, from, map, Observable, of, tap, throwError } from 'rxjs';
import { Auth, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { FirebaseBackendService } from './firebase-backend.service';
import { UserDetails } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _auth: Auth;

    private _currentUserData: UserDetails | undefined;

    get currentUserData(): UserDetails | undefined {
        return this._currentUserData;
    }

    constructor(
        private readonly _firebaseBackendService: FirebaseBackendService
    ) {
        this._auth = getAuth();
        // this._auth.authStateReady().then
    }

    loginWithEmail(credentials: { username: string, password: string }): Observable<UserDetails> {
        return from(signInWithEmailAndPassword(this._auth, credentials.username, credentials.password))
            .pipe(
                concatMap(res => res.user.getIdToken()),
                map(accessToken => this._firebaseBackendService.setAccessToken(accessToken)),
                concatMap(() => this.getUserInfo()),
                catchError(e => {
                    console.error(`login With Email ${e}`);
                    return throwError(() => of({}));
                })
            );
    }

    getUserInfo(): Observable<UserDetails> {
        return this._firebaseBackendService.get<{ data: UserDetails }>('/users/me')
            .pipe(
                map(res => res.data),
                tap(userDetails => this._currentUserData = userDetails)
            );
    }
}
