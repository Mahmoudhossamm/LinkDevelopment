import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class ProductParams implements PaginatedFilter {
  keyword: string;
  categoryId: number;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
