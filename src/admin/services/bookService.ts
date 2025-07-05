import { Book, BookDTO, ApiResponse, PaginatedResponse } from "../types";

const API_URL = "http://localhost:8080/admin/books";

class BookServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "BookServiceError";
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Lỗi không xác định" }));
    throw new BookServiceError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
    );
  }
  return response.json();
};

export const getBooks = async (params?: {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
}): Promise<PaginatedResponse<BookDTO>> => {
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

    const response = await fetch(url);
    return handleResponse<PaginatedResponse<BookDTO>>(response);
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể tải danh sách sách");
  }
};

export const getBookById = async (id: number): Promise<BookDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse<BookDTO>(response);
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể tải thông tin sách");
  }
};

export const createBook = async (book: Book): Promise<BookDTO> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    return handleResponse<BookDTO>(response);
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể tạo sách mới");
  }
};

export const updateBook = async (id: number, book: Book): Promise<BookDTO> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    return handleResponse<BookDTO>(response);
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể cập nhật sách");
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Lỗi không xác định" }));
      throw new BookServiceError(
        errorData.message || `HTTP Error: ${response.status}`,
        response.status,
      );
    }
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể xóa sách");
  }
};

export const searchBooks = async (query: string): Promise<BookDTO[]> => {
  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}`,
    );
    return handleResponse<BookDTO[]>(response);
  } catch (error) {
    if (error instanceof BookServiceError) throw error;
    throw new BookServiceError("Không thể tìm kiếm sách");
  }
};
