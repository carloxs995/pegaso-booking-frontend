import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IBookingDetails } from '../../../../../models/booking.model';
import { MatButtonModule } from '@angular/material/button';
import { BookingsService } from '../../../../../services/bookings.service';

@Component({
    selector: 'app-confirm-payment-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title>Elimina Prenotazione</h2>
    <mat-dialog-content>
      <p>
        Sei sicuro di voler <b style="color:red">ELIMINARE</b> la prenotazione di
        <b>{{ data.booking.customerFirstName }} {{ data.booking.customerLastName }}</b>?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annulla</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Elimina</button>
    </mat-dialog-actions>
  `,
    styles: [
        `
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
    `
    ]
})
export class AdminBookingsDeleteDialog {
    constructor(
        private readonly _bookingService: BookingsService,
        public dialogRef: MatDialogRef<AdminBookingsDeleteDialog>,
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
