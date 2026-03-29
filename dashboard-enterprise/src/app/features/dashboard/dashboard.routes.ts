import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/dashboard/dashboard.component')
        .then((m) => m.DashboardComponent)
    },

]