import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductApiService } from 'src/app/core/api/catalog/product-api.service';
import { Upload } from 'src/app/core/models/uploads/upload';
import { IResult } from 'src/app/core/models/wrappers/IResult';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Result } from 'src/app/core/models/wrappers/Result';
import { Product } from '../models/product';
import { ProductParams } from '../models/productParams';

@Injectable()
export class ProductService {
  constructor(private api: ProductApiService) {}




  getAllProducts(brandParams: ProductParams): Observable<PaginatedResult<Product>> {
    return this.api
      .getAlls(brandParams)
      .pipe(map((response: PaginatedResult<Product>) => response));
  }

 

  getProductById(id: string): Observable<Result<Product>> {
    return this.api.getById(id).pipe(map((response: Result<Product>) => response));
  }

  getProductImageById(id: string): Observable<Result<string>> {
    return this.api.getImageById(id).pipe(map((response: Result<string>) => response));
  }

  createProduct(product: Product): Observable<IResult<Product>> {
    return this.api
      .create(product)
      .pipe(map((response: IResult<Product>) => response));
  }

  updateProduct(product: Product): Observable<IResult<Product>> {
      return this.api
      .update(product)
      .pipe(map((response: IResult<Product>) => response));
  }

  deleteProduct(id: string): Observable<IResult<string>> {
    return this.api
      .delete(id)
      .pipe(map((response: IResult<string>) => response));
  }
}
