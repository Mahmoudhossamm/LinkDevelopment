import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { IdentityComponent } from './identity/identity.component';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { EventLogsComponent } from './event-logs/event-logs.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'identity',
    canActivate: [AuthGuard],
    component: IdentityComponent,
    loadChildren: () => import('./identity/identity.module').then(mod => mod.IdentityModule),
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'catalog',
    canActivate: [AuthGuard],
    component: CatalogComponent,
    loadChildren: () => import('./catalog/catalog.module').then(mod => mod.CatalogModule),
  },
  {
    path: 'ecommerce',
    canActivate: [AuthGuard],
    component: EcommerceComponent,
    loadChildren: () => import('./ecommerce/ecommerce.module').then(mod => mod.EcommerceModule),
  },
  {
    path: 'event-logs',
    canActivate: [AuthGuard],
    component: EventLogsComponent,
    loadChildren: () => import('./event-logs/event-logs.module').then(mod => mod.ActivityLogsModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
