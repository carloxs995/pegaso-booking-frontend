import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
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
import { RoomFilter } from '../../models/room.models';

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
        RoomSearchBarComponent
    ],
    templateUrl: './rooms-home.component.html',
    styleUrl: './rooms-home.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class RoomsHomeComponent {
    rooms$ = inject(RoomsService).getRoomsList().pipe(map(res => res.data));

    onSearch(event: Event) {
        console.log(event);
    }
}
