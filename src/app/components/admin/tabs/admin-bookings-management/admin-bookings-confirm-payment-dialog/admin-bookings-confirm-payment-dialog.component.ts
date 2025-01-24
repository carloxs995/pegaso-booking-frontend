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
    <h2 mat-dialog-title>Conferma Pagamento</h2>
    <mat-dialog-content>
      <p>
        Sei sicuro di voler confermare il pagamento per
        <b>{{ data.booking.customerFirstName }} {{ data.booking.customerLastName }}</b>?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annulla</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Conferma</button>
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
export class ConfirmPaymentDialogComponent {
    constructor(
        private readonly _bookingService: BookingsService,
        public dialogRef: MatDialogRef<ConfirmPaymentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { booking: IBookingDetails }
    ) { }

    onConfirm(): void {
        this._bookingService.confirmPayment(this.data.booking.id)
            .subscribe(() => {
                this.dialogRef.close('confirm');
            })
    }

    onCancel(): void {
        this.dialogRef.close('cancel');
    }
}
