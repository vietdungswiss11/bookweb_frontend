import {
  User,
  UserDTO,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
} from "../types/User";

const API_URL = "http://localhost:8080/users";

class UserServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "UserServiceError";
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
    throw new UserServiceError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
    );
  }
  return response.json();
};

export const getUsers = async (params?: {
  page?: number;
  size?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
}): Promise<PaginatedResponse<UserDTO>> => {
  try {
    let url = API_URL;
    if (params) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
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
    return handleResponse<PaginatedResponse<UserDTO>>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể tải danh sách người dùng");
  }
};

export const getUserById = async (id: number): Promise<UserDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<UserDTO>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể tải thông tin người dùng");
  }
};

export const createUser = async (user: CreateUserRequest): Promise<UserDTO> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    return handleResponse<UserDTO>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể tạo người dùng mới");
  }
};

export const updateUser = async (
  id: number,
  user: UpdateUserRequest,
): Promise<UserDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    return handleResponse<UserDTO>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể cập nhật người dùng");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Lỗi không xác định" }));
      throw new UserServiceError(
        errorData.message || `HTTP Error: ${response.status}`,
        response.status,
      );
    }
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể xóa người dùng");
  }
};

export const searchUsers = async (query: string): Promise<UserDTO[]> => {
  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}`,
      {
        headers: getAuthHeaders(),
      },
    );
    return handleResponse<UserDTO[]>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể tìm kiếm người dùng");
  }
};

export const toggleUserStatus = async (
  id: number,
  isActive: boolean,
): Promise<UserDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}/toggle-status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    });
    return handleResponse<UserDTO>(response);
  } catch (error) {
    if (error instanceof UserServiceError) throw error;
    throw new UserServiceError("Không thể thay đổi trạng thái người dùng");
  }
};
