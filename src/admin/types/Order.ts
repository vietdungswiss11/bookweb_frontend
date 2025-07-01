export type OrderStatus =
  | "PENDING" // Chờ xử lý
  | "CONFIRMED" // Đã xác nhận
  | "PROCESSING" // Đang xử lý
  | "SHIPPED" // Đã giao vận
  | "DELIVERED" // Đã giao hàng
  | "CANCELLED" // Đã hủy
  | "REFUNDED"; // Đã hoàn tiền

export type PaymentStatus =
  | "PENDING" // Chờ thanh toán
  | "PAID" // Đã thanh toán
  | "FAILED" // Thanh toán thất bại
  | "REFUNDED"; // Đã hoàn tiền

export type PaymentMethod =
  | "CASH" // Tiền mặt
  | "BANK_TRANSFER" // Chuyển khoản
  | "CREDIT_CARD" // Thẻ tín dụng
  | "E_WALLET"; // Ví điện tử

export interface OrderItem {
  id: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookImageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerInfo {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
}

export interface ShippingAddress {
  recipientName: string;
  phoneNumber: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  postalCode?: string;
  notes?: string;
}

export interface OrderDTO {
  id: number;
  orderCode: string;
  customer: CustomerInfo;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
  cancelReason?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  search?: string; // Search by order code, customer name, email
}

export interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
  todayOrders: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đã giao vận",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
  REFUNDED: "Đã hoàn tiền",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Chờ thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thanh toán thất bại",
  REFUNDED: "Đã hoàn tiền",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: "Tiền mặt",
  BANK_TRANSFER: "Chuyển khoản",
  CREDIT_CARD: "Thẻ tín dụng",
  E_WALLET: "Ví điện tử",
};
