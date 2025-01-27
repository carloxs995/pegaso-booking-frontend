import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RoomCardComponent } from './room-card/room-card.component';
import { RoomsService } from '../../services/rooms.service';
import { map } from 'rxjs';
import { RoomSearchBarComponent } from "./room-search-bar/room-search-bar.component";
import { IRoomDetails, RoomFilters } from '../../models/room.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
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
        RoomCardComponent,
        CommonModule,
        RoomSearchBarComponent,
        MatProgressSpinnerModule
    ],
    templateUrl: './rooms-home.component.html',
    styleUrl: './rooms-home.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class RoomsHomeComponent implements OnInit {
    roomsList: IRoomDetails[] = [];
    filters: RoomFilters | undefined;
    isLoading: boolean = true;

    private readonly _roomsService: RoomsService = inject(RoomsService);

    ngOnInit(): void {
        this.initDataSource();
    }

    initDataSource() {
        this.isLoading = true;
        this._roomsService.getRoomsList(this.filters)
            .pipe(map(res => res.data))
            .subscribe(items => {
                this.isLoading = false;
                this.roomsList = items
            });
    }

    onSearch(filters: RoomFilters) {
        this.filters = filters;
        this.initDataSource();
    }
}
