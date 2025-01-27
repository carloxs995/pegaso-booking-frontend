import { CommonModule } from '@angular/common';
import { Component, ComponentRef, HostBinding, inject, ViewChild } from '@angular/core';
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
import { IRoomDetails } from '../../../../models/room.models';
import { RoomsService } from '../../../../services/rooms.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../../../services/sidenav.service';
import { AdminServicesCreationPanelComponent } from './admin-services-creation-panel/admin-services-creation-panel.component';

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
    ],
    templateUrl: './admin-services-management.component.html',
    styleUrl: './admin-services-management.component.scss'
})
export class AdminServicesManagementComponent {
    @HostBinding('className') className = 'admin-services-management';

    displayedColumns: string[] = ['id', 'name', 'type', 'totalRooms', 'actions'];

    dataSource: MatTableDataSource<IRoomDetails> = new MatTableDataSource();

    private readonly _router: Router = inject(Router);
    private readonly _roomService: RoomsService = inject(RoomsService);
    readonly sideNavService: SidenavService = inject(SidenavService);

    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

    ngOnInit() {
        this._initDataSource();
        this.listenOnCloseSideNav();
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

    openPanel(isNewService: boolean, item?: IRoomDetails): void {
        const data = {
            isNewService,
            item
        }

        this.sideNavService.openSidenav(AdminServicesCreationPanelComponent, data);
    }

    listenOnCloseSideNav() {
        this.sideNavService.isSidenavOpen$.subscribe(close => (!close && this._initDataSource()));
    }
}
