import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IRoomDetails } from '../../../models/room.models';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-room-card',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatCardModule,
        MatButtonModule
    ],
    templateUrl: './room-card.component.html',
    styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
    @HostBinding('className') className = 'room-card';

    @Input() item!: IRoomDetails;
}
