import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { DiscountRulesParams } from 'src/app/modules/admin/ecommerce/models/discoutRulesParams';
import { DiscountRules } from 'src/app/modules/admin/ecommerce/models/DiscountRules';
@Injectable()
export class DiscountRulesApiService {
  baseUrl = environment.apiUrl + 'v1/discountrules/';
  constructor(private http: HttpClient) {
  }

  getAlls(params: DiscountRulesParams) {
    return this.http.post(this.baseUrl + 'search', params);
  }

  getById(id: string) {
    return this.http.get<DiscountRules>(this.baseUrl + id);
  }

  create(DiscountRules: DiscountRules) {
    return this.http.post(this.baseUrl, DiscountRules);
  }

  update(DiscountRules: DiscountRules) {
    return this.http.put(this.baseUrl + DiscountRules.id, DiscountRules);
  }

 
  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
