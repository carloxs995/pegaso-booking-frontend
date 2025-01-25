import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, inject, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ROOM_TYPE_AVAILABLE, RoomFilters } from '../../../models/room.models';

@Component({
    selector: 'room-search-bar',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './room-search-bar.component.html',
    styleUrl: './room-search-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class RoomSearchBarComponent {
    @HostBinding('className') className = 'room-search-bar';

    @Output() onSearch: EventEmitter<RoomFilters> = new EventEmitter();

    searchForm: FormGroup<Record<keyof RoomFilters, FormControl>> = new FormGroup({
        serviceType: new FormControl(''),
        checkInDate: new FormControl(new Date(), Validators.required),
        checkOutDate: new FormControl(this._addDays(new Date(), 1), Validators.required),
        guests: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    readonly ROOM_TYPE_AVAILABLE = ROOM_TYPE_AVAILABLE;
    readonly TODAY = new Date();

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('it-IT');
        this.searchForm.controls.checkInDate.valueChanges.subscribe((newCheckIn) => {
            if (newCheckIn) {
                const checkOut = this._addDays(newCheckIn, 1);
                this.searchForm.controls.checkOutDate.setValue(checkOut);
                this.searchForm.controls.checkOutDate.updateValueAndValidity();
            }
        });
    }

    private _addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    triggerSearch(): void {
        const form = this.searchForm.getRawValue();
        if(!form.serviceType) {
            delete form.serviceType;
        }

        this.onSearch.emit({
            ...form,
            checkInDate: (form.checkInDate as Date).toISOString(),
            checkOutDate: (form.checkOutDate as Date).toISOString()
        });
    }
}
