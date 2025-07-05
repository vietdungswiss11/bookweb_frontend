import { Book, BookDTO } from "../types";
import { authFetch } from "../../services/authFetch";

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

export const createBook = async (book: Book): Promise<BookDTO> => {
  try {
    const response = await authFetch(API_URL, {
      method: "POST",
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
    const response = await authFetch(`${API_URL}/${id}`, {
      method: "PUT",
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
    const response = await authFetch(`${API_URL}/${id}`, {
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
