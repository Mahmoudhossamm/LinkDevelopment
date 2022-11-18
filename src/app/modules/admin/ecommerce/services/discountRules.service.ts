import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/models/wrappers/PaginatedResult';
import { DiscountRules } from '../models/DiscountRules';
import { HttpParams } from '@angular/common/http';
import { IResult } from '../../../../core/models/wrappers/IResult';
import { map } from 'rxjs/operators';
import { DiscountRulesApiService } from 'src/app/core/api/eCommerce/discountRules-api.service';
import { DiscountRulesParams } from '../models/discoutRulesParams';

@Injectable()
export class DiscountRulesService {
  constructor(private api: DiscountRulesApiService) {}

  getDiscountRules(DiscountRulesParams: DiscountRulesParams): Observable<PaginatedResult<DiscountRules>> {
    return this.api
      .getAlls(DiscountRulesParams)
      .pipe(map((response: PaginatedResult<DiscountRules>) => response));
  }
  getDiscountRulesById(id: string): Observable<DiscountRules> {
    return this.api.getById(id).pipe(map((response: DiscountRules) => response));
  }

  createDiscountRules(DiscountRules: DiscountRules): Observable<IResult<DiscountRules>> {
    return this.api
      .create(DiscountRules)
      .pipe(map((response: IResult<DiscountRules>) => response));
  }

  updateDiscountRules(DiscountRules: DiscountRules): Observable<IResult<DiscountRules>> {
    return this.api
      .update(DiscountRules)
      .pipe(map((response: IResult<DiscountRules>) => response));
  }

  deleteDiscountRules(id: string): Observable<IResult<string>> {
    return this.api
      .delete(id)
      .pipe(map((response: IResult<string>) => response));
  }
}
