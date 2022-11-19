import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Orders } from 'src/app/modules/admin/ecommerce/models/Orders';
import { OrdersParams } from 'src/app/modules/admin/ecommerce/models/ordersParams';
@Injectable()
export class OrdersApiService {
  baseUrl = environment.apiUrl + 'v1/orders/';
  constructor(private http: HttpClient) {
  }

  getAlls(params: OrdersParams) {
    return this.http.post(this.baseUrl + 'search', params);
  }

  getById(id: string) {
    return this.http.get<Orders>(this.baseUrl + id);
  }

  create(Orders: Orders) {
    return this.http.post(this.baseUrl, Orders);
  }

  update(Orders: Orders) {
    return this.http.put(this.baseUrl + Orders.id, Orders);
  }

 
  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
