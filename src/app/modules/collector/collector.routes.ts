import { Routes } from '@angular/router';

export const COLLECTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'requests',
    loadComponent: () => import('./components/collector-requests/collector-requests.component').then(m => m.CollectorRequestsComponent)
  },

];