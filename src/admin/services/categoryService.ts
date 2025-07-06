import { Category, CategoryListResponse, PaginatedResponse } from "../types";
import { authFetch } from "../../services/authFetch";

const API_URL = "http://localhost:8080/admin/categories";

class CategoryServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "CategoryServiceError";
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Lỗi không xác định" }));
    throw new CategoryServiceError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
    );
  }
  return response.json();
};

export const getAllCategories = async (params?: {
  page?: number;
  size?: number;
  keyword?: string;
}): Promise<CategoryListResponse | PaginatedResponse<Category> | Category[]> => {
  try {
    const url = new URL("http://localhost:8080/categories");
    if (params?.page !== undefined)
      url.searchParams.append("page", params.page.toString());
    if (params?.size !== undefined)
      url.searchParams.append("size", params.size.toString());
    if (params?.keyword) url.searchParams.append("keyword", params.keyword);

    const response = await fetch(url.toString());
    return handleResponse<CategoryListResponse | PaginatedResponse<Category> | Category[]>(response);
  } catch (error) {
    if (error instanceof CategoryServiceError) throw error;
    throw new CategoryServiceError("Không thể tải danh sách danh mục");
  }
};

export const createCategory = async (category: {
  name: string;
}): Promise<Category> => {
  try {
    const response = await authFetch(API_URL, {
      method: "POST",
      body: JSON.stringify(category),
    });
    return handleResponse<Category>(response);
  } catch (error) {
    if (error instanceof CategoryServiceError) throw error;
    throw new CategoryServiceError("Không thể tạo danh mục mới");
  }
};

export const updateCategory = async (
  id: number,
  category: { name: string },
): Promise<Category> => {
  try {
    const response = await authFetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
    return handleResponse<Category>(response);
  } catch (error) {
    if (error instanceof CategoryServiceError) throw error;
    throw new CategoryServiceError("Không thể cập nhật danh mục");
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const response = await authFetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Lỗi không xác định" }));
      throw new CategoryServiceError(
        errorData.message || `HTTP Error: ${response.status}`,
        response.status,
      );
    }
  } catch (error) {
    if (error instanceof CategoryServiceError) throw error;
    throw new CategoryServiceError("Không thể xóa danh mục");
  }
};

export const searchCategories = async (keyword: string): Promise<Category[]> => {
  try {
    const url = new URL("http://localhost:8080/categories/search");
    url.searchParams.append("keyword", keyword);
    const response = await fetch(url.toString());
    return handleResponse<Category[]>(response);
  } catch (error) {
    if (error instanceof CategoryServiceError) throw error;
    throw new CategoryServiceError("Không thể tìm kiếm danh mục");
  }
};
