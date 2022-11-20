import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Product } from 'src/app/modules/admin/catalog/models/product';
import { ProductParams } from 'src/app/modules/admin/catalog/models/productParams';
import { ProductService } from 'src/app/modules/admin/catalog/services/product.service';
import { DiscountRules } from '../../../models/DiscountRules';
import { DiscountRulesService } from '../../../services/discountRules.service';

@Component({
  selector: 'app-discount-rules-form',
  templateUrl: './discount-rules-form.component.html',
  styleUrls: ['./discount-rules-form.component.scss']
})
export class DiscountRulesFormComponent implements OnInit {
  discountRulesForm: FormGroup;
  formTitle: string;
  products: PaginatedResult<Product>;
  ProductParams = new ProductParams();


  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: DiscountRules, 
  private discountRuleservice: DiscountRulesService, 
  private ProductService: ProductService,
  private toastr: ToastrService, 
  private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.ProductParams.pageSize = 5;
    this.getproducts();
  }

  initializeForm() {
    this.discountRulesForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      productId: [this.data && this.data.productId],
      percentage: [this.data && this.data.percentage,[ Validators.required,Validators.min(1),Validators.max(100)]],
      quantity: [this.data && this.data.quantity, Validators.required],
    
    });
    if (this.discountRulesForm.get('id').value === '' || this.discountRulesForm.get('id').value == null) {
      this.formTitle = 'Register Discount Rule';
    } else {
      this.formTitle = 'Edit DiscountRule';
    }
  }


  getproducts() {
    this.ProductService.getAllProducts(this.ProductParams).subscribe((response) => { this.products = response; });
  }


  onSubmit() {
    // TODO after successful update/insert, refresh table view in component product.component.ts


    if (this.discountRulesForm.valid) {
      if (this.discountRulesForm.get('id').value === '' || this.discountRulesForm.get('id').value == null) {
        this.discountRuleservice.createDiscountRules(this.discountRulesForm.value).subscribe(response => {
          this.toastr.success("Product Added Successfully");
        });
      } else {
        this.discountRuleservice.updateDiscountRules(this.discountRulesForm.value).subscribe(response => {
          this.toastr.success("Product Updated Successfully");
        });
      }
    }
  }

}

