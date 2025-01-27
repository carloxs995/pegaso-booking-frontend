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
import { Router, RouterModule } from '@angular/router';
import { BookingStatus, BookingStatuses, IBookingDetails, IBookingsFiltersListSchema } from '../../../models/booking.model';
import { ROOM_TYPE_AVAILABLE } from '../../../models/room.models';
import { BookingsService } from '../../../services/bookings.service';
import { formatDate } from '../../../helpers/date.helpers';
import { getStatusInfo } from '../../../helpers/bookings.helpers';
import { AdminBookingsDeleteDialog } from '../../admin/tabs/admin-bookings-management/admin-bookings-delete-dialog/admin-bookings-delete-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingDeleteDialogComponent } from '../booking-manage/booking-delete-dialog/booking-delete-dialog.component';


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
        MatToolbarModule,
        RouterModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './bookings-list.component.html',
    styleUrl: './bookings-list.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class BookingsListComponent {
    @HostBinding('className') className = 'booking-list';

    displayedColumns: string[] = ['id', 'serviceName', 'checkInDate', 'checkOutDate', 'status', 'actions'];
    dataSource: MatTableDataSource<IBookingDetails> = new MatTableDataSource();

    filters: IBookingsFiltersListSchema = {
    };

    isLoading: boolean = true;

    serviceTypes = ROOM_TYPE_AVAILABLE;
    statuses = BookingStatuses;

    private readonly _router: Router = inject(Router);
    private readonly _bookingsService: BookingsService = inject(BookingsService);
    private readonly _dialog: MatDialog = inject(MatDialog);

    formatDate = (date: string): string => formatDate(date);
    getStatusInfo = (status: BookingStatus) => getStatusInfo(status);

    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

    ngOnInit() {
        this._initDataSource();
    }

    private _initDataSource(): void {
        this.isLoading = true;
        this._bookingsService.getBookingsList(this.filters).subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data.items)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
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
                (parsedFilter.id ? data.id === parsedFilter.id : true)
            );
        };
        this.dataSource.filter = JSON.stringify(this.filters);
    }

    clearFilters() {
        this.filters = { id: '' };
        this.dataSource.filter = '';
    }

    onDelete(booking: IBookingDetails) {
        this._dialog.open(BookingDeleteDialogComponent, {
            width: '400px',
            data: { booking }
        }).
            afterClosed()
            .subscribe(result => {
                if (result === 'confirm') {
                    this._initDataSource();
                }
            });
    }
}
