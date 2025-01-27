import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IBookingDetails } from '../../../../../models/booking.model';
import { MatButtonModule } from '@angular/material/button';
import { BookingsService } from '../../../../../services/bookings.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-payment-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    template: `
    <h2 mat-dialog-title>Conferma Pagamento</h2>
    <mat-dialog-content>
      <p>
        Sei sicuro di voler <b style="color: green;">CONFERMARE</b> il pagamento per
        <b>{{ data.booking.customerFirstName }} {{ data.booking.customerLastName }}</b>?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()" [disabled]="isProcessing">Annulla</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" [disabled]="isProcessing">
        <ng-container *ngIf="!isProcessing; else loading">
          Conferma
        </ng-container>
      </button>
    </mat-dialog-actions>

    <ng-template #loading>
      <mat-spinner [diameter]="24"></mat-spinner>
    </ng-template>
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
export class AdminBookingsConfirmPaymentDialogComponent {
    isProcessing = false;

    constructor(
        private readonly _bookingService: BookingsService,
        public dialogRef: MatDialogRef<AdminBookingsConfirmPaymentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { booking: IBookingDetails }
    ) { }

    onConfirm(): void {
        this.isProcessing = true;
        this._bookingService.confirmPayment(this.data.booking.id)
            .subscribe({
                next: () => {
                    this.isProcessing = false;
                    this.dialogRef.close('confirm');
                },
                error: () => {
                    this.isProcessing = false;
                }
            });
    }

    onCancel(): void {
        if (!this.isProcessing) {
            this.dialogRef.close('cancel');
        }
    }
}
