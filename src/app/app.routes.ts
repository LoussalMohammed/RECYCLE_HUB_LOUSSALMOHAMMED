import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { RoleGuard } from './core/guards/role.guard';
import { CollectorLayoutComponent } from './modules/collector/layouts/collector-layout/collector-layout.component';
import { UserLayoutComponent } from './modules/user/layouts/user-layout/user-layout.component';

export const routes: Routes = [
    {
      path: '',
      component: HomePageComponent,
    },
    {
      path: 'user',
      component: UserLayoutComponent,
      canActivate: [RoleGuard],
      data: { role: 'user' },
      children: [
        {
          path: 'requests',
          loadChildren: () =>
            import('./modules/user/user.routes').then((m) => m.USER_ROUTES),
        },
        {
          path: 'profile',
          loadComponent: () =>
            import('./shared/reactive-components/profile/profile.component').then(
              (m) => m.ProfileComponent
            ),
        },
        {
          path: 'points',
          loadComponent: () => import('./modules/user/components/points-conversion/points-conversion.component').then(m => m.PointsConversionComponent)
        }
      ],
    },
    {
      path: 'collector',
      component: CollectorLayoutComponent,
      canActivate: [RoleGuard],
      data: { role: 'collector' },
      children: [
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./modules/collector/collector.routes').then(
              (m) => m.COLLECTOR_ROUTES
            ),
        },
        {
          path: 'profile',
          loadComponent: () =>
            import('./shared/reactive-components/profile/profile.component').then(
              (m) => m.ProfileComponent
            ),
        },
      ],
    },
  ];
  
