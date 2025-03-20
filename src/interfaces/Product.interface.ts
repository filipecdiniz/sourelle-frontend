export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  url: string;
  quantity: number;
  description: string;
  categoryId: string;
}

export interface ProductOrderInterface {
  amount: number;
  product: {
    id: number;
    name: string;
    price: number;
    url: string;
    quantity: number;
    description: string;
    categoryId: string;
  }
}