import { Routes } from '@angular/router';
import { AdminAreaHomeComponent } from './components/admin/admin-area-home/admin-area-home.component';

export const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdminAreaHomeComponent
            }
        ]
    }
];
