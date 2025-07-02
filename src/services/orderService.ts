const API_URL = "http://localhost:8080";

export interface OrderRequest {
  userId: string;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  items: Array<{
    bookId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingFee: number;
  couponCode?: string;
  couponDiscount?: number;
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

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function createOrder(
  orderData: OrderRequest,
): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/orders`, {
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
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }

  return response.json();
}

export async function getUserOrders(userId: string): Promise<OrderResponse[]> {
  const response = await fetch(`${API_URL}/users/${userId}/orders`, {
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
  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update order status: ${response.status}`);
  }

  return response.json();
}
