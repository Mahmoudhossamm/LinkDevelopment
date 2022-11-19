import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/models/wrappers/PaginatedResult';
import { Orders } from '../models/Orders';
import { HttpParams } from '@angular/common/http';
import { IResult } from '../../../../core/models/wrappers/IResult';
import { map } from 'rxjs/operators';
import { OrdersApiService } from 'src/app/core/api/eCommerce/orders-api.service';
import { OrdersParams } from '../models/ordersParams';


@Injectable()
export class OrdersService {
  constructor(private api: OrdersApiService) {}

  getOrders(ordersParams: OrdersParams): Observable<PaginatedResult<Orders>> {
    return this.api
      .getAlls(ordersParams)
      .pipe(map((response: PaginatedResult<Orders>) => response));
  }

  getOrdersById(id: string): Observable<Orders> {
    return this.api.getById(id).pipe(map((response: Orders) => response));
  }

  createOrders(Orders: Orders): Observable<IResult<Orders>> {
    return this.api
      .create(Orders)
      .pipe(map((response: IResult<Orders>) => response));
  }

  updateOrders(Orders: Orders): Observable<IResult<Orders>> {
    return this.api
      .update(Orders)
      .pipe(map((response: IResult<Orders>) => response));
  }

  deleteOrders(id: string): Observable<IResult<string>> {
    return this.api
      .delete(id)
      .pipe(map((response: IResult<string>) => response));
  }
}
