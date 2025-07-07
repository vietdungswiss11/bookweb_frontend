import { authFetch } from "./authFetch";

const API_URL = "http://localhost:8080";

export interface OrderItemRequestDTO {
  bookId: number;
  quantity: number;
}

export interface CreateOrderRequestDTO {
  userId: number;
  addressId: number;
  paymentMethod: string;
  shippingProvider: string;
  orderItems: OrderItemRequestDTO[];
}

export interface OrderResponse {
  id: string;
  status:
  | "PENDING"
  | "CONFIRMED"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
  paymentMethod: string;
  paymentUrl?: string; // For Momo/VNPAY redirect
  totalAmount: number;
  createdAt: string;
}

export interface OrderDTO {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  // Thêm các trường khác nếu cần
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function createOrder(
  orderData: CreateOrderRequestDTO,
): Promise<OrderResponse> {
  const response = await authFetch(`${API_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Order creation failed: ${response.status}`);
  }

  return response.json();
}

export async function getOrderById(orderId: string): Promise<OrderResponse> {
  const response = await authFetch(`${API_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }

  return response.json();
}

export async function getUserOrders(userId: string): Promise<OrderResponse[]> {
  const response = await authFetch(`${API_URL}/users/${userId}/orders`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user orders: ${response.status}`);
  }

  return response.json();
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<OrderResponse> {
  const response = await authFetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update order status: ${response.status}`);
  }

  return response.json();
}

export async function getOrdersByUserId(userId: string | number) {
  const res = await authFetch(`${API_URL}/orders/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();
  return Array.isArray(data.orders) ? data.orders : [];
}
