import { Component, HostBinding, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { IRoomDetails } from '../../../models/room.models';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../../services/rooms.service';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { addDays } from '../../../helpers/date.helpers';
import { AuthenticationService } from '../../../services/authentication.service';
import { LoginComponent } from '../../core/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatChipsModule,
        ReactiveFormsModule,
        CommonModule,
        GalleryModule,
        MatNativeDateModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RoomDetailsComponent implements OnInit {
    @HostBinding('className') className = 'room-details';

    room!: IRoomDetails;

    bookingForm = new FormGroup({
        checkInDate: new FormControl(new Date(), Validators.required),
        checkOutDate: new FormControl(addDays(new Date(), 1), Validators.required),
        guests: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    galleryImages!: GalleryItem[];

    isAvailable: boolean = false;
    showAvailabilityStatus: boolean = false;
    totalPrice: number = 0;
    isCalculatingPrice: boolean = false;

    readonly TODAY = new Date();

    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _roomsService = inject(RoomsService);
    private readonly _authenticationService = inject(AuthenticationService);
    private readonly _dialog: MatDialog = inject(MatDialog);

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('it-IT');
        this.bookingForm.controls.checkInDate.valueChanges.subscribe((newCheckIn) => {
            if (newCheckIn) {
                this.isAvailable = false;
                this.totalPrice = 0;
                this.showAvailabilityStatus = false;
                const checkOut = addDays(newCheckIn, 1);
                this.bookingForm.controls.checkOutDate.setValue(checkOut);
                this.bookingForm.controls.checkOutDate.updateValueAndValidity();
            }
        });

        combineLatest([
            this.bookingForm.controls.checkOutDate.valueChanges,
            this.bookingForm.controls.guests.valueChanges,
        ]).subscribe(() => {
            this.isAvailable = false;
            this.totalPrice = 0;
            this.showAvailabilityStatus = false;
        });
    }

    ngOnInit(): void {
        this._activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this._roomsService.getRoomDetails(id)
                    .subscribe(res => {
                        this.room = res;
                        this.galleryImages = this.room.images.map(
                            img => new ImageItem({ src: img, thumb: img })
                        )
                    })
            }
        })
    }

    private _openLoginDialog(): Observable<boolean> {
        const dialogRef = this._dialog.open(
            LoginComponent,
            {
                width: '400px',
                disableClose: true
            }
        );

        return dialogRef.afterClosed();
    }


    onCheckAvailability() {
        const checkInDate = this.bookingForm.controls.checkInDate.value;
        const checkOutDate = this.bookingForm.controls.checkOutDate.value;
        const guests = this.bookingForm.controls.guests.value;

        if (checkInDate && checkOutDate && guests) {
            if (!this.totalPrice) {
                this.isCalculatingPrice = true;
                this._roomsService.checkAvailability(
                    this.room.id,
                    (checkInDate).toISOString(),
                    (checkOutDate).toISOString(),
                    guests
                ).subscribe(res => {
                    this.isAvailable = res.data.isAvailable;
                    this.totalPrice = res.data.totalPrice;
                    this.showAvailabilityStatus = true;
                    this.isCalculatingPrice = false;
                })

                return;
            }

            const navigateToBookingPage = () => {
                this._router.navigate(['/bookings/create', this.room.id], {
                    queryParams: {
                        checkInDate: checkInDate.toISOString(),
                        checkOutDate: checkOutDate.toISOString(),
                        guests: guests,
                        serviceName: this.room.type,
                        totalPrice: this.totalPrice
                    }
                });
            }

            if (this._authenticationService.currentUserData$.getValue()) {
                navigateToBookingPage();
                return;
            }

            this._openLoginDialog()
                .subscribe(isOK => {
                    if (isOK) {
                        navigateToBookingPage();
                    }
                });
        }
    }
}
