import { Upload } from "src/app/core/models/uploads/upload";

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  quantity: number;
}
