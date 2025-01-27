import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { BookingStatus, BookingStatuses, IBookingDetails, IBookingsFiltersListSchema } from '../../../models/booking.model';
import { ROOM_TYPE_AVAILABLE } from '../../../models/room.models';
import { BookingsService } from '../../../services/bookings.service';
import { formatDate } from '../../../helpers/date.helpers';
import { getStatusInfo } from '../../../helpers/bookings.helpers';


@Component({
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatExpansionModule,
        MatSelectModule,
        MatSlideToggleModule,
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatDialogModule,
        MatToolbarModule
    ],
    templateUrl: './bookings-list.component.html',
    styleUrl: './bookings-list.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class BookingsListComponent {
    @HostBinding('className') className = 'booking-list';

    displayedColumns: string[] = ['id', 'serviceName', 'checkInDate', 'checkOutDate', 'status'];
    dataSource: MatTableDataSource<IBookingDetails> = new MatTableDataSource();

    filters: IBookingsFiltersListSchema = {
    };

    serviceTypes = ROOM_TYPE_AVAILABLE;
    statuses = BookingStatuses;

    private readonly _router: Router = inject(Router);
    private readonly _bookingsService: BookingsService = inject(BookingsService);

    formatDate = (date: string): string => formatDate(date);
    getStatusInfo = (status: BookingStatus) => getStatusInfo(status);

    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

    ngOnInit() {
        this._initDataSource();
    }

    private _initDataSource(): void {
        this._bookingsService.getBookingsList(this.filters).subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data.items)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim();
        console.log(filterValue);
        this.dataSource.filter = filterValue;
    }

    applyAdvancedFilter() {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const parsedFilter = JSON.parse(filter);
            console.log(data, parsedFilter);
            return (
                (parsedFilter.serviceName ? data.serviceName === parsedFilter.serviceName : true)
            );
        };
        this.dataSource.filter = JSON.stringify(this.filters);
    }

    clearFilters() {
        this.filters = { serviceName: undefined, isPaid: false };
        this.dataSource.filter = '';
    }

    onEdit(booking: IBookingDetails) {
        this._router.navigate([`/bookings/${booking.id}`]);
    }
}
