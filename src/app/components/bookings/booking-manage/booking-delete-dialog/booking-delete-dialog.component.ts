import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookingsService } from '../../../../services/bookings.service';
import { IBookingDetails } from '../../../../models/booking.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-booking-delete-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    template: `
        <h2 mat-dialog-title>Eliminare la prenotazione?</h2>
        <mat-dialog-content>
            <p>Sei sicuro di voler eliminare questa prenotazione? Questa azione non può essere annullata.</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onCancel()" [disabled]="isLoading">Annulla</button>
            <button mat-raised-button color="warn" (click)="onConfirm()" [disabled]="isLoading">
                <span *ngIf="!isLoading">Conferma Eliminazione</span>
                <mat-spinner *ngIf="isLoading" diameter="24"></mat-spinner>
            </button>
        </mat-dialog-actions>
    `,
    styles: `
        mat-dialog-content {
            font-size: 16px;
            margin-bottom: 20px;
        }

        mat-dialog-actions {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
        }

        button {
            margin-left: 10px;
        }

        mat-spinner {
            display: inline-block;
            vertical-align: middle;
        }
    `
})
export class BookingDeleteDialogComponent {
    isLoading = false;

    constructor(
        private readonly _bookingService: BookingsService,
        public dialogRef: MatDialogRef<BookingDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { booking: IBookingDetails }
    ) { }

    onConfirm(): void {
        this.isLoading = true;
        this._bookingService.deleteBooking(this.data.booking.id)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                    this.dialogRef.close('confirm');
                },
                error: () => {
                    this.isLoading = false;
                }
            });
    }

    onCancel(): void {
        if (!this.isLoading) {
            this.dialogRef.close('cancel');
        }
    }
}
