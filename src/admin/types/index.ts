export interface Book {
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  discountPrice: number;
  description?: string;
  categoryId: number;
  images: { id?: number; url: string; name?: string }[];
  imageUrl?: string;
  stockQuantity?: number;
  isbn?: string;
  publicationDate: string;
  publisher?: string;
  language?: string;
  pages?: number;
  sold: number;
}

export interface BookDTO {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  discountPrice: number;
  description?: string;
  categoryId: number;
  images: { id?: number; url: string; name?: string }[];
  imageUrl?: string;
  stockQuantity?: number;
  isbn?: string;
  publicationDate?: string;
  publisher?: string;
  language?: string;
  pages?: number;
  createdAt?: string;
  updatedAt?: string;
  sold?: number;
  categories?: { id: number; name: string }[];
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

export interface BookListResponse {
  books: BookDTO[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  categories: Category[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
