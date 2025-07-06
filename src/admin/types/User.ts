export interface User {
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role?: "USER" | "ADMIN";
  isActive?: boolean;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface RoleDTO {
  id: number;
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roles: RoleDTO[];
  isActive: boolean;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: "USER" | "ADMIN";
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: "USER" | "ADMIN";
  isActive?: boolean;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
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
