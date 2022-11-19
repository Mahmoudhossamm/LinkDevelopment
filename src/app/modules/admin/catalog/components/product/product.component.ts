import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Product } from '../../models/product';
import { ProductParams } from '../../models/productParams';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: PaginatedResult<Product>;
  productColumns: TableColumn[];
  productParams = new ProductParams();
  searchString: string;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productParams.pageSize = 5;
    this.getProducts();
    this.initColumns();
   
  }

  getProducts(): void {

    this.productService.getAllProducts(this.productParams).subscribe((result) => {
      this.products = result;
    });
  }

  initColumns(): void {
    this.productColumns = [
      //{ name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'CategoryName', dataKey: 'categoryName', isSortable: true, isShowable: true },
      { name: 'Description', dataKey: 'description', isSortable: true, isShowable: true },
      { name: 'Price', dataKey: 'price', isSortable: true, isShowable: true },
      { name: 'Quantity', dataKey: 'quantity', isSortable: true, isShowable: true },
      
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.productParams.pageNumber = event.pageNumber;
    this.productParams.pageSize = event.pageSize;
    this.getProducts();
  }

  openForm(product?: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }

  remove($event: string): void {
    this.productService.deleteProduct($event).subscribe(() => {
      this.getProducts();
      this.toastr.info('Product Removed');
    });
  }

  sort($event: Sort): void {
    this.productParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.productParams.orderBy);
    this.getProducts();
  }

  filter($event: string): void {
    this.productParams.keyword = $event.trim().toLocaleLowerCase();
    this.productParams.pageNumber = 0;
    this.productParams.pageSize = 0;
    this.getProducts();
  }

  reload(): void {
    this.productParams.keyword = '';
    this.productParams.pageNumber = 0;
    this.productParams.pageSize = 0;
    this.getProducts();
  }
}
