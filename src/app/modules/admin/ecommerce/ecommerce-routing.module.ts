import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountRolesComponent } from './components/discount-roles/discount-roles.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: 'discount',
    component: DiscountRolesComponent
  },
  {
    path: 'orders',
    component: OrdersComponent,
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
