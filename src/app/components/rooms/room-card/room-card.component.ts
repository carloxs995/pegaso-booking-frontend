import { Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IRoomDetails } from '../../../models/room.models';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
    selector: 'app-room-card',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './room-card.component.html',
    styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
    @HostBinding('className') className = 'room-card';

    @Input() item!: IRoomDetails;

    private readonly _router = inject(Router);

    onNavigateToDetails() {
        this._router.navigate([`/rooms/${this.item.id}`]);
    }
}
