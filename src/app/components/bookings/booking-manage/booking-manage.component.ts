import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { formatDate } from '../../../helpers/date.helpers';
import { BookingsService } from '../../../services/bookings.service';
import { BookingStatus, IBookingCreation, IBookingDetails } from '../../../models/booking.model';
import { MatCardModule } from '@angular/material/card';
import { RoomsService } from '../../../services/rooms.service';
import { IRoomDetails } from '../../../models/room.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { concatMap, firstValueFrom, from } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { BookingDeleteDialogComponent } from './booking-delete-dialog/booking-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getStatusInfo } from '../../../helpers/bookings.helpers';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './booking-manage.component.html',
    styleUrl: './booking-manage.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class BookingManageComponent {

    bookingForm: FormGroup<Record<keyof IBookingCreation, FormControl>> = new FormGroup({
        customerFirstName: new FormControl('', [Validators.required]),
        customerLastName: new FormControl('', [Validators.required]),
        customerEmail: new FormControl('', [Validators.required, Validators.email]),
        customerPhone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]),
        serviceName: new FormControl({ value: '', disabled: true }, Validators.required),
        quantityGuests: new FormControl({ value: 0, disabled: true }, Validators.required),
        checkInDate: new FormControl({ value: '', disabled: true }, Validators.required),
        checkOutDate: new FormControl({ value: '', disabled: true }, Validators.required),
        paymentMethod: new FormControl({ value: 'cash', disabled: true }, Validators.required),
        servicePrice: new FormControl({ value: 0, disabled: true }, Validators.required),
        serviceId: new FormControl({ value: 0, disabled: true }, Validators.required),
        notes: new FormControl(''),
    });

    formatDate = (date: string) => formatDate(date);

    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _authenticationService = inject(AuthenticationService);
    private readonly _bookingsService = inject(BookingsService);
    private readonly _roomsService = inject(RoomsService);
    private readonly _dialog: MatDialog = inject(MatDialog);
    private readonly _snackBar = inject(MatSnackBar);

    isEditing: boolean = false;
    roomDetails!: IRoomDetails;
    bookingDetails!: IBookingDetails; //only edit mode
    isDialogOpened: boolean = false;
    isLoading: boolean = true;
    isSubmitting: boolean = false;

    getStatusInfo = (status: BookingStatus) => getStatusInfo(status);

    ngOnInit(): void {
        this._activatedRoute.params.subscribe(params => {
            this.isLoading = true;
            this.isEditing = this._activatedRoute.snapshot.data['isEditing'];
            const roomId = this.isEditing ? null : params['roomId'];
            const bookingId = this.isEditing ? params['bookingId'] : null;

            if (this.isEditing) {
                this._initDataToEditMode(bookingId);
                return;
            }

            this._initDataToNewBooking(roomId);
        });
    }

    private _initDataToNewBooking(roomId: string): void {
        this._roomsService.getRoomDetails(roomId).subscribe(roomDetails => {
            this.roomDetails = roomDetails;

            this._activatedRoute.queryParamMap.subscribe(queryParams => {
                this.bookingForm.patchValue({
                    customerFirstName: this._authenticationService.currentUserData$.value?.firstName,
                    customerLastName: this._authenticationService.currentUserData$.value?.lastName,
                    customerEmail: this._authenticationService.currentUserData$.value?.email,
                    serviceId: roomId,
                    checkInDate: queryParams.get('checkInDate'),
                    checkOutDate: queryParams.get('checkOutDate'),
                    quantityGuests: Number(queryParams.get('guests')),
                    serviceName: queryParams.get('serviceName'),
                    servicePrice: queryParams.get('totalPrice'),
                });

                this.isLoading = false;
            });

        })
    }

    private _initDataToEditMode(bookingId: string): void {
        this._bookingsService.getBookingDetails(bookingId)
            .pipe(
                concatMap(async bookingDetails => {
                    this.roomDetails = await firstValueFrom(this._roomsService.getRoomDetails(bookingDetails.serviceId));
                    console.log(this.roomDetails);
                    return bookingDetails;
                })
            )
            .subscribe(data => {
                this.bookingDetails = data;
                this.bookingForm.patchValue({
                    ...data
                });
                if (this.bookingDetails.status === 'cancelled') {
                    this.bookingForm.disable();
                }
                this.isLoading = false;
            })
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            this.isSubmitting = true;
            if (this.isEditing) {
                this._bookingsService.updateBooking(this.bookingDetails.id, this.bookingForm.getRawValue())
                    .subscribe(() => {
                        this._router.navigate(['/bookings']);
                        this._snackBar.open(`Prenotazione #${this.bookingDetails.id} Aggiornata!`, 'Chiudi', { duration: 5000 });
                    })
                return;
            }

            this._bookingsService.createBooking(this.bookingForm.getRawValue())
                .subscribe(() => {
                    this._router.navigate(['/bookings']);
                    this._snackBar.open('Prenotazione Creata!', 'Chiudi', { duration: 5000 });
                })
        }
    }

    openDeleteDialog(): void {
        this._dialog.open(BookingDeleteDialogComponent, {
            width: '400px',
            data: { booking: this.bookingDetails }
        }).afterClosed()
            .subscribe(result => {
                if (result === 'confirm') {
                    this._router.navigate(['/bookings']);
                    this._snackBar.open(`Prenotazione #${this.bookingDetails.id} Annullata`, 'Chiudi', { duration: 5000 });
                }
            });
    }
}
