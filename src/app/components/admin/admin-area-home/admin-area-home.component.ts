import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminBookingsManagementComponent } from "../tabs/admin-bookings-management/admin-bookings-management.component";
import { AdminServicesManagementComponent } from "../tabs/admin-services-management/admin-services-management.component";
import { AdminUsersManagementComponent } from "../tabs/admin-users-management/admin-users-management.component";

@Component({
    selector: 'app-admin-area-home',
    imports: [MatTabsModule, AdminBookingsManagementComponent, AdminServicesManagementComponent, AdminUsersManagementComponent],
    templateUrl: './admin-area-home.component.html',
    styleUrl: './admin-area-home.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AdminAreaHomeComponent {

    @HostBinding('className') className = 'admin-area-home';

}
