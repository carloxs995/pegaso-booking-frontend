import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from '../../../../services/users.service';
import { UserDetails } from '../../../../models/user.model';

@Component({
    selector: 'app-admin-users-management',
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
    templateUrl: './admin-users-management.component.html',
    styleUrl: './admin-users-management.component.scss'
})
export class AdminUsersManagementComponent {
    @HostBinding('className') className = 'admin-users-management';

    displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'disabled'];

    dataSource: MatTableDataSource<UserDetails> = new MatTableDataSource();

    private readonly _usersService: UsersService = inject(UsersService);

    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
    @ViewChild('sideNavPanel') sideNavPanel!: MatSidenav;

    ngOnInit() {
        this._initDataSource();
    }

    private _initDataSource(): void {
        this._usersService.getUsersList().subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data.items)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        })
    }
}
