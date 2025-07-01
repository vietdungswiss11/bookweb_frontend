import {
  OrderDTO,
  UpdateOrderStatusRequest,
  OrderFilters,
  OrderStats,
  PaginatedResponse,
} from "../types/Order";

const API_URL = "http://localhost:8080/orders";

class OrderServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "OrderServiceError";
  }
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Lỗi không xác định" }));
    throw new OrderServiceError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
    );
  }
  return response.json();
};

export const getOrders = async (params?: {
  page?: number;
  size?: number;
  filters?: OrderFilters;
}): Promise<PaginatedResponse<OrderDTO>> => {
  try {
    let url = API_URL;
    if (params) {
      const query = new URLSearchParams();

      if (params.page !== undefined) query.append("page", String(params.page));
      if (params.size !== undefined) query.append("size", String(params.size));

      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value));
          }
        });
      }

      if (query.toString()) {
        url += `?${query.toString()}`;
      }
    }

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return handleResponse<PaginatedResponse<OrderDTO>>(response);
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể tải danh sách đơn hàng");
  }
};

export const getOrderById = async (id: number): Promise<OrderDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<OrderDTO>(response);
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể tải thông tin đơn hàng");
  }
};

export const updateOrderStatus = async (
  id: number,
  data: UpdateOrderStatusRequest,
): Promise<OrderDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<OrderDTO>(response);
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể cập nhật trạng thái đơn hàng");
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Lỗi không xác định" }));
      throw new OrderServiceError(
        errorData.message || `HTTP Error: ${response.status}`,
        response.status,
      );
    }
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể x��a đơn hàng");
  }
};

export const searchOrders = async (query: string): Promise<OrderDTO[]> => {
  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}`,
      {
        headers: getAuthHeaders(),
      },
    );
    return handleResponse<OrderDTO[]>(response);
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể tìm kiếm đơn hàng");
  }
};

export const getOrderStats = async (
  period?: "today" | "week" | "month" | "year",
): Promise<OrderStats> => {
  try {
    const url = period
      ? `${API_URL}/stats?period=${period}`
      : `${API_URL}/stats`;
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return handleResponse<OrderStats>(response);
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể tải thống kê đơn hàng");
  }
};

export const exportOrders = async (filters?: OrderFilters): Promise<Blob> => {
  try {
    let url = `${API_URL}/export`;
    if (filters) {
      const query = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, String(value));
        }
      });
      if (query.toString()) {
        url += `?${query.toString()}`;
      }
    }

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new OrderServiceError("Không thể xuất dữ liệu đơn hàng");
    }

    return response.blob();
  } catch (error) {
    if (error instanceof OrderServiceError) throw error;
    throw new OrderServiceError("Không thể xuất dữ liệu đơn hàng");
  }
};
