export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  short_description: string;
  image: string;
  weight: number;
  price: number;
  stocks: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}
