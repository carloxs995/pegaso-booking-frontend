import { Component, Inject, inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageUploaderComponent } from '../../../../core/image-uploader/image-uploader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { IRoomDetails, ROOM_TYPE_AVAILABLE } from '../../../../../models/room.models';
import { concatMap, Subscription } from 'rxjs';
import { SIDENAV_DATA, SidenavService } from '../../../../../services/sidenav.service';
import { RoomsService } from '../../../../../services/rooms.service';
import { CommonModule } from '@angular/common';

@Component({
    imports: [
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatChipsModule,
        ImageUploaderComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        CommonModule,
        MatFormFieldModule
    ],
    templateUrl: './admin-services-creation-panel.component.html',
    styleUrl: './admin-services-creation-panel.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AdminServicesCreationPanelComponent implements OnInit, OnDestroy {
    selectedServices: string[] = [];

    serviceTypes = ROOM_TYPE_AVAILABLE;

    isEditMode: boolean = false;

    isLoading: boolean = false;

    private readonly _formBuilder: FormBuilder = inject(FormBuilder);
    private readonly _sideNavService: SidenavService = inject(SidenavService);
    private readonly _roomService: RoomsService = inject(RoomsService);
    @Inject(SIDENAV_DATA) public data: any;

    private _subscription: Subscription = new Subscription();

    @ViewChild(ImageUploaderComponent, { read: ImageUploaderComponent }) imageUploader!: ImageUploaderComponent;

    serviceForm: FormGroup = this._formBuilder.group({
        id: [''],
        type: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        capacity: ['', [Validators.required, Validators.min(1)]],
        pricePerNight: ['', [Validators.required, Validators.min(1)]],
        totalRooms: ['', [Validators.required, Validators.min(1)]],
        amenities: ['', [Validators.required]],
        images: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
    });

    ngOnInit(): void {
        this._subscription = this._sideNavService.sidenavData$.subscribe(data => console.log(data));
    }

    async onSubmitForm() {
        console.log(this.serviceForm.getRawValue());
        const imagesUrl = await this.imageUploader.saveChanges();
        console.log(imagesUrl);
        this.serviceForm.get('images')?.setValue(imagesUrl);

        const apiToCall = this.isEditMode ?
            this._roomService.updateRoom(this.serviceForm.getRawValue()) :
            this._roomService.createRoom(this.serviceForm.getRawValue());

        apiToCall
            .pipe(concatMap(() => apiToCall))
            .subscribe(() => {
                this._sideNavService.closeSidenav();
            })
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

    onEdit(service: IRoomDetails) {
        this.isEditMode = true;
        this.isLoading = true;
        this._roomService.getRoomDetails(service.id)
            .subscribe((res) => {
                const { type, name, description, capacity, pricePerNight, totalRooms, amenities, images } = res;
                this.serviceForm.setValue({ id: service.id, type, name, description, capacity, pricePerNight, totalRooms, amenities, images: images || [] });
                this.serviceForm.updateValueAndValidity();
                this.isLoading = false;
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
            images: []
        });
        this.selectedServices = [];

        this.serviceForm.updateValueAndValidity();
    }

    onPanelClose(): void {
        this._sideNavService.closeSidenav();
        this._subscription.unsubscribe();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
