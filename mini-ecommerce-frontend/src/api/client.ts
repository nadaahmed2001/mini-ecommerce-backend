import type { Product, Order, CreateOrderDto } from "./interfaces";

const API_BASE_URL = 'http://localhost:5101/api';



class ApiClient {
  private async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.fetch<Product[]>('/products');
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.fetch<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  // Orders
  async createOrder(order: CreateOrderDto): Promise<Order> {
    return this.fetch<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrder(id: number): Promise<Order> {
    return this.fetch<Order>(`/orders/${id}`);
  }
}

export const api = new ApiClient();
