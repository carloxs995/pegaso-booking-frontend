import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookingsService } from '../../../../services/bookings.service';
import { IBookingDetails } from '../../../../models/booking.model';

@Component({
    selector: 'app-booking-delete-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    template: `
            <h2 mat-dialog-title>Eliminare la prenotazione?</h2>
            <mat-dialog-content>
                <p>Sei sicuro di voler eliminare questa prenotazione? Questa azione non può essere annullata.</p>
            </mat-dialog-content>
            <mat-dialog-actions>
                <button mat-button (click)="onCancel()">Annulla</button>
                <button mat-raised-button color="warn" (click)="onConfirm()">Conferma Eliminazione</button>
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
        }`
})
export class BookingDeleteDialogComponent {
    constructor(
        private readonly _bookingService: BookingsService,
        public dialogRef: MatDialogRef<BookingDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { booking: IBookingDetails }
    ) { }

    onConfirm(): void {
        this._bookingService.deleteBooking(this.data.booking.id)
            .subscribe(() => {
                this.dialogRef.close('confirm');
            })
    }

    onCancel(): void {
        this.dialogRef.close('cancel');
    }
}
