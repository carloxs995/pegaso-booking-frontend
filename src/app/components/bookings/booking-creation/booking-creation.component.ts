import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { formatDate } from '../../../helpers/date.helpers';
import { BookingsService } from '../../../services/bookings.service';
import { IBookingCreation } from '../../../models/booking.model';
import { MatCardModule } from '@angular/material/card';
import { RoomsService } from '../../../services/rooms.service';
import { IRoomDetails } from '../../../models/room.models';

@Component({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule
    ], templateUrl: './booking-creation.component.html',
    styleUrl: './booking-creation.component.scss'
})
export class BookingCreationComponent {

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
    private readonly _authenticationService = inject(AuthenticationService);
    private readonly _bookingsService = inject(BookingsService);
    private readonly _roomsService = inject(RoomsService);
    roomDetails!: IRoomDetails;

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(params => {
            const roomId = params.get('roomId');
            if (!roomId) {
                return;
            }

            this._roomsService.getRoomDetails(roomId).subscribe(roomDetails => {
                this.roomDetails = roomDetails;
                this._activatedRoute.queryParamMap.subscribe(queryParams => {
                    this.bookingForm.patchValue({
                        customerFirstName: this._authenticationService.currentUserData$.value?.firstName,
                        customerLastName: this._authenticationService.currentUserData$.value?.lastName,
                        customerEmail: this._authenticationService.currentUserData$.value?.email,
                        serviceId: params.get('roomId'),
                        checkInDate: queryParams.get('checkInDate'),
                        checkOutDate: queryParams.get('checkOutDate'),
                        quantityGuests: Number(queryParams.get('guests')),
                        serviceName: queryParams.get('serviceName'),
                        servicePrice: queryParams.get('totalPrice'),
                    });
                });
            })
        });
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            this._bookingsService.createBooking(this.bookingForm.getRawValue())
                .subscribe(res => {
                    console.log(res);
                })
        }
    }
}
