import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceComponent } from './ecommerce.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DiscountRolesComponent } from './components/discount-roles/discount-roles.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { DiscountRulesApiService } from 'src/app/core/api/eCommerce/discountRules-api.service';
import { DiscountRulesService } from './services/discountRules.service';
import { DiscountRulesFormComponent } from './components/discount-roles/discount-rules-form/discount-rules-form.component';



@NgModule({
  declarations: [
    EcommerceComponent,
     OrdersComponent,
    DiscountRolesComponent,
    DiscountRulesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    EcommerceRoutingModule
  ],
  providers: [
    DiscountRulesService
  ]
  
})
export class EcommerceModule { }
