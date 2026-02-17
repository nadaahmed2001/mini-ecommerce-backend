export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
}

export interface CreateOrderDto {
  customerName: string;
  items: OrderItemDto[];
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  customerName: string;
  createdAt: string;
  totalAmount: number;
  discount: number;
  items: OrderItem[];
}