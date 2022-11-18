import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class OrdersParams implements PaginatedFilter {
  keyword: string;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
