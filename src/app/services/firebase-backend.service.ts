import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseBackendService {
    private readonly baseURL = 'https://us-central1-pegaso-booking.cloudfunctions.net/api';

    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    get<T>(endpoint: string, params?: any): Observable<T> {
        return this.httpClient.get<T>(
            `${this.baseURL}${endpoint}`,
            {
                headers: this.getHeaders(),
                params
            }).pipe(catchError(this.handleError));
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.httpClient.post<T>(
            `${this.baseURL}${endpoint}`,
            body,
            {
                headers: this.getHeaders()

            }).pipe(catchError(this.handleError));
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.httpClient.put<T>(
            `${this.baseURL}${endpoint}`,
            body,
            {
                headers: this.getHeaders()
            }).pipe(catchError(this.handleError));
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.httpClient.delete<T>(
            `${this.baseURL}${endpoint}`,
            {
                headers: this.getHeaders()
            }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error(`Server Error: ${error.status}, ${error.message}`);
        return throwError(() => new Error('Something went wrong!'));
    }
}
