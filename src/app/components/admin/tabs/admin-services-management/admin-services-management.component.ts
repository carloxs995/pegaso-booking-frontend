import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';
import { IRoomDetails, ROOM_TYPE_AVAILABLE } from '../../../../models/room.models';
import { RoomsService } from '../../../../services/rooms.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-admin-services-management',
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
        MatSidenavModule,
        ReactiveFormsModule,
        MatChipsModule
    ],
    templateUrl: './admin-services-management.component.html',
    styleUrl: './admin-services-management.component.scss'
})
export class AdminServicesManagementComponent {
    @HostBinding('className') className = 'admin-services-management';

    displayedColumns: string[] = ['id', 'name', 'type', 'totalRooms', 'actions'];

    dataSource: MatTableDataSource<IRoomDetails> = new MatTableDataSource();
    selectedServices: string[] = [];

    serviceTypes = ROOM_TYPE_AVAILABLE;

    isEditMode: boolean = false;

    private readonly _router: Router = inject(Router);
    private readonly _roomService: RoomsService = inject(RoomsService);
    private readonly _formBuilder: FormBuilder = inject(FormBuilder);

    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
    @ViewChild('sideNavPanel') sideNavPanel!: MatSidenav;

    serviceForm: FormGroup = this._formBuilder.group({
        id: [''],
        type: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        capacity: ['', [Validators.required, Validators.min(1)]],
        pricePerNight: ['', [Validators.required, Validators.min(1)]],
        totalRooms: ['', [Validators.required, Validators.min(1)]],
        amenities: ['', [Validators.required]],
    });

    ngOnInit() {
        this._initDataSource();
    }

    private _initDataSource(): void {
        this._roomService.getRoomsList().subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        })
    }

    onViewRoom(service: IRoomDetails) {
        this._router.navigate([`/rooms/${service.id}`])
    }

    onEdit(service: IRoomDetails) {
        this.isEditMode = true;
        this._roomService.getRoomDetails(service.id)
            .subscribe((res) => {
                const { id, type, name, description, capacity, pricePerNight, totalRooms, amenities } = res;
                this.serviceForm.setValue({ id: service.id, type, name, description, capacity, pricePerNight, totalRooms, amenities });
                this.serviceForm.updateValueAndValidity();
                this.openPanel();
                this.selectedServices = amenities;
            })
    }

    onCreateService(): void {
        this.isEditMode = false;
        this.serviceForm.setValue({
            id: '',
            type: '',
            name: '',
            description: '',
            capacity: '',
            pricePerNight: '',
            totalRooms: '',
            amenities: '',
        });
        this.selectedServices = [];

        this.serviceForm.updateValueAndValidity();
        this.openPanel();
    }

    openPanel(): void {
        this.sideNavPanel.toggle();
    }

    onSubmitForm() {
        console.log(this.serviceForm.getRawValue());
        if (this.serviceForm.valid) {
            const apiToCall = this.isEditMode ?
                this._roomService.updateRoom(this.serviceForm.getRawValue()) :
                this._roomService.createRoom(this.serviceForm.getRawValue());

            apiToCall
                .subscribe(() => {
                    this.sideNavPanel.close().then(() => this._initDataSource());
                })
        }
    }

    removeRoomServices(service: string): void {
        const index = this.selectedServices.indexOf(service);
        if (index >= 0) {
            this.selectedServices.splice(index, 1);
        }
    }

    addRoomServices(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value && !this.selectedServices.includes(value)) {
            this.selectedServices.push(value);
        }
        event.chipInput!.clear();
        this.serviceForm.controls['amenities'].setValue(this.selectedServices);
    }
}
