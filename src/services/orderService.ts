import { authFetch } from "./authFetch";
import API_BASE_URL from './apiConfig';

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
  orderNumber: string;
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
): Promise<OrderResponse & { paymentUrl?: string }> {
  const response = await authFetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Order creation failed: ${response.status}`);
  }

  const data = await response.json();
  // Nếu có paymentUrl (VNPAY), trả về order + paymentUrl
  if (data.paymentUrl && data.order) {
    return { ...data.order, paymentUrl: data.paymentUrl };
  }
  // Nếu chỉ trả về order như cũ
  return data;
}

export async function getOrderById(orderId: string): Promise<OrderResponse> {
  const response = await authFetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }

  return response.json();
}

export async function getUserOrders(userId: string): Promise<OrderResponse[]> {
  const response = await authFetch(`${API_BASE_URL}/users/${userId}/orders`, {
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
  const response = await authFetch(`${API_BASE_URL}/orders/${orderId}/status`, {
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
  const res = await authFetch(`${API_BASE_URL}/orders/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();
  return Array.isArray(data.orders) ? data.orders : [];
}

export async function getOrderByOrderNumber(orderNumber: string): Promise<OrderResponse> {
  const response = await authFetch(`${API_BASE_URL}/orders/by-number/${orderNumber}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch order by orderNumber: ${response.status}`);
  }
  return response.json();
}
