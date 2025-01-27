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
import { IBookingCreation, IBookingDetails } from '../../../models/booking.model';
import { MatCardModule } from '@angular/material/card';
import { RoomsService } from '../../../services/rooms.service';
import { IRoomDetails } from '../../../models/room.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { concatMap, firstValueFrom, from } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

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
        MatIconModule
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
        customerPhone: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
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

    isEditing: boolean = false;
    roomDetails!: IRoomDetails;
    bookingDetails!: IBookingDetails; //only edit mode
    isDialogOpened: boolean = false;
    isLoading: boolean = true;;

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
                this.isLoading = false;
            })
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            this._bookingsService.createBooking(this.bookingForm.getRawValue())
                .subscribe(res => {
                    console.log(res);
                })
        }
    }

    getStatusIcon(): string {
        const status = this.bookingDetails.status;;
        return status === 'confirmed' ? 'check_circle' : status === 'cancelled' ? 'cancel' : 'hourglass_empty';
    }

    get statusColor(): string {
        return `status-${this.bookingDetails.status}`;
    }

    deleteBooking(): void {
        console.log('Prenotazione eliminata');
        this._router.navigate(['/']);
    }

    closeDeleteDialog(): void {
        this._dialog.closeAll();
    }

    openDeleteDialog(): void {

    }
}
