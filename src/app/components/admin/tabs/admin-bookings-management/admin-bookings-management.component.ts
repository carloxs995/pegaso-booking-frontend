import { CommonModule } from '@angular/common';
import { Component, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
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

const ELEMENT_DATA = [
    { id: '001', serviceType: 'Luxury', customerName: 'John Doe', isPaid: true, status: 'Confirmed' },
    { id: '002', serviceType: 'Deluxe', customerName: 'Jane Smith', isPaid: false, status: 'Pending' },
    { id: '003', serviceType: 'Standard', customerName: 'Alice Brown', isPaid: true, status: 'Completed' },
    { id: '004', serviceType: 'Suite', customerName: 'Charlie Black', isPaid: false, status: 'Cancelled' },
    { id: '001', serviceType: 'Luxury', customerName: 'John Doe', isPaid: true, status: 'Confirmed' },
    { id: '002', serviceType: 'Deluxe', customerName: 'Jane Smith', isPaid: false, status: 'Pending' },
    { id: '003', serviceType: 'Standard', customerName: 'Alice Brown', isPaid: true, status: 'Completed' },
    { id: '004', serviceType: 'Suite', customerName: 'Charlie Black', isPaid: false, status: 'Cancelled' },
    { id: '001', serviceType: 'Luxury', customerName: 'John Doe', isPaid: true, status: 'Confirmed' },
    { id: '002', serviceType: 'Deluxe', customerName: 'Jane Smith', isPaid: false, status: 'Pending' },
    { id: '003', serviceType: 'Standard', customerName: 'Alice Brown', isPaid: true, status: 'Completed' },
    { id: '004', serviceType: 'Suite', customerName: 'Charlie Black', isPaid: false, status: 'Cancelled' },
    { id: '001', serviceType: 'Luxury', customerName: 'John Doe', isPaid: true, status: 'Confirmed' },
    { id: '002', serviceType: 'Deluxe', customerName: 'Jane Smith', isPaid: false, status: 'Pending' },
    { id: '003', serviceType: 'Standard', customerName: 'Alice Brown', isPaid: true, status: 'Completed' },
    { id: '004', serviceType: 'Suite', customerName: 'Charlie Black', isPaid: false, status: 'Cancelled' },
    { id: '001', serviceType: 'Luxury', customerName: 'John Doe', isPaid: true, status: 'Confirmed' },
    { id: '002', serviceType: 'Deluxe', customerName: 'Jane Smith', isPaid: false, status: 'Pending' },
    { id: '003', serviceType: 'Standard', customerName: 'Alice Brown', isPaid: true, status: 'Completed' },
    { id: '004', serviceType: 'Suite', customerName: 'Charlie Black', isPaid: false, status: 'Cancelled' },
];

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

    displayedColumns: string[] = ['id', 'serviceType', 'customerName', 'isPaid', 'status', 'actions'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    filter = {
        serviceType: '',
        status: '',
        isPaid: false
    };

    serviceTypes = ['Standard', 'Deluxe', 'Suite', 'Luxury', 'Penthouse'];
    statuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    ngOnInit() {
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }

    applyAdvancedFilter() {
        this.dataSource.filterPredicate = (data: any, filter: string) => { //TODO: typize it correctly
            const parsedFilter = JSON.parse(filter);
            return (
                (parsedFilter.serviceType ? data.serviceType === parsedFilter.serviceType : true) &&
                (parsedFilter.status ? data.status === parsedFilter.status : true) &&
                (parsedFilter.isPaid !== null ? data.isPaid === parsedFilter.isPaid : true)
            );
        };
        this.dataSource.filter = JSON.stringify(this.filter);
    }

    clearFilters() {
        this.filter = { serviceType: '', status: '', isPaid: false };
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
