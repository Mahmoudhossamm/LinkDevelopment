import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import { Upload } from 'src/app/core/models/uploads/upload';
import { UploadType } from 'src/app/core/models/uploads/upload-type';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Brand } from '../../../models/brand';
import { BrandParams } from '../../../models/brandParams';
import { Category } from '../../../models/category';
import { CategoryParams } from '../../../models/categoryParams';
import {Product} from '../../../models/product';
import { CategoryService } from '../../../services/category.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  formTitle: string;
  categories: PaginatedResult<Category>;
  categoryParams = new CategoryParams();

  url: any = [];
  upload = new Upload();

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: Product, 
  private productService: ProductService, 
  private categoryService: CategoryService,
  private toastr: ToastrService, 
  private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.categoryParams.pageSize = 5;
    //this.getBrands();
    this.getCategories();
   // this.loadProductImage();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      description: [this.data && this.data.description, Validators.required], // todo get categories and show dropdown list to select category
      categoryId: [this.data && this.data.categoryId, Validators.required],
      price: [this.data && this.data.price, Validators.required],
      quantity: [this.data && this.data.quantity, Validators.required],
    
    });
    if (this.productForm.get('id').value === '' || this.productForm.get('id').value == null) {
      this.formTitle = 'Register Product';
    } else {
      this.formTitle = 'Edit Product';
    }
  }


  getCategories() {
    this.categoryService.getCategories(this.categoryParams).subscribe((response) => { this.categories = response; });
  }


  onSubmit() {
    // TODO after successful update/insert, refresh table view in component product.component.ts

    if (this.productForm.valid) {
      if (this.productForm.get('id').value === '' || this.productForm.get('id').value == null) {
        this.productService.createProduct(this.productForm.value).subscribe(response => {
          this.toastr.success("Product Added Successfully");
        });
      } else {
        this.productService.updateProduct(this.productForm.value).subscribe(response => {
          this.toastr.success("Product Updated Successfully");
        });
      }
    }
  }

}
