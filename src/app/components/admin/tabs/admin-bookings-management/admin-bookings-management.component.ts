import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BookingsService } from '../../../../services/bookings.service';
import { IBookingDetails, IBookingsFiltersListSchema } from '../../../../models/booking.model';

@Component({
    selector: 'app-admin-bookings-management',
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
    ],
    templateUrl: './admin-bookings-management.component.html',
    styleUrl: './admin-bookings-management.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AdminBookingsManagementComponent {
    @HostBinding('className') className = 'admin-bookings-management';

    displayedColumns: string[] = ['id', 'serviceName', 'customerName', 'isPaid', 'status', 'actions'];
    dataSource: MatTableDataSource<IBookingDetails> = new MatTableDataSource();

    filters: IBookingsFiltersListSchema = {
    };

    serviceTypes = ['Standard', 'Deluxe', 'Suite', 'Luxury', 'Penthouse'];
    statuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];


    private readonly _bookingsService: BookingsService = inject(BookingsService);

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    ngOnInit() {
        this._initDataSource();
    }

    private _initDataSource(): void {
        this._bookingsService.getBookingsList(this.filters).subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data.items)
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim();
        console.log(filterValue);
        this.dataSource.filter = filterValue;
    }

    applyAdvancedFilter() {
        this.dataSource.filterPredicate = (data: any, filter: string) => { //TODO: typize it correctly
            const parsedFilter = JSON.parse(filter);
            console.log(data, parsedFilter);
            return (
                (parsedFilter.serviceName ? data.serviceName === parsedFilter.serviceName : true) &&
                (parsedFilter.isPaid !== false ? data.isPaid === parsedFilter.isPaid : true)
            );
        };
        this.dataSource.filter = JSON.stringify(this.filters);
    }

    clearFilters() {
        this.filters = { serviceName: undefined, isPaid: false };
        this.dataSource.filter = '';
    }

    onEdit(element: any) {
        console.log('Modifica:', element);
    }

    onConfirmPayment(element: any) {
        console.log('Conferma pagamento per:', element);
    }

    onDelete(element: any) {
        console.log('Eliminazione:', element);
    }
}
