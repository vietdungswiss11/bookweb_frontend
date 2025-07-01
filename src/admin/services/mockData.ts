export interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalBooks: number;
  monthlyRevenue: number;
}

export interface RevenueData {
  day: string;
  value: number;
}

export interface OrderStatusData {
  label: string;
  value: number;
  color: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
}

export interface RecentActivity {
  id: string;
  type: "order" | "user" | "book";
  message: string;
  time: string;
}

export const getDashboardStats = (): DashboardStats => {
  return {
    totalOrders: 1234,
    totalUsers: 567,
    totalBooks: 890,
    monthlyRevenue: 120000000,
  };
};

export const getRevenueData = (): RevenueData[] => {
  return [
    { day: "T2", value: 15000000 },
    { day: "T3", value: 18000000 },
    { day: "T4", value: 12000000 },
    { day: "T5", value: 22000000 },
    { day: "T6", value: 25000000 },
    { day: "T7", value: 28000000 },
    { day: "CN", value: 20000000 },
  ];
};

export const getOrderStatusData = (): OrderStatusData[] => {
  return [
    { label: "Đã giao", value: 856, color: "#10b981" },
    { label: "Đang xử lý", value: 234, color: "#f59e0b" },
    { label: "Đã hủy", value: 144, color: "#ef4444" },
  ];
};

export const getRecentOrders = (): RecentOrder[] => {
  return [
    {
      id: "ORD-2024-001",
      customer: "Nguyễn Văn An",
      date: "15/01/2024",
      amount: 450000,
      status: "Đã giao",
    },
    {
      id: "ORD-2024-002",
      customer: "Trần Thị Bình",
      date: "15/01/2024",
      amount: 280000,
      status: "Đang xử lý",
    },
    {
      id: "ORD-2024-003",
      customer: "Lê Minh Châu",
      date: "14/01/2024",
      amount: 350000,
      status: "Đã giao",
    },
    {
      id: "ORD-2024-004",
      customer: "Phạm Thị Dung",
      date: "14/01/2024",
      amount: 125000,
      status: "Đã hủy",
    },
    {
      id: "ORD-2024-005",
      customer: "Hoàng Văn Em",
      date: "14/01/2024",
      amount: 680000,
      status: "Đang xử lý",
    },
    {
      id: "ORD-2024-006",
      customer: "Vũ Thị Phương",
      date: "13/01/2024",
      amount: 295000,
      status: "Đã giao",
    },
  ];
};

export const getRecentActivities = (): RecentActivity[] => {
  return [
    {
      id: "1",
      type: "order",
      message: "Đơn hàng #ORD-2024-007 vừa được tạo bởi Nguyễn Thị Mai",
      time: "2 phút trước",
    },
    {
      id: "2",
      type: "user",
      message: 'Người dùng mới "tranvanb@email.com" vừa đăng ký tài khoản',
      time: "5 phút trước",
    },
    {
      id: "3",
      type: "book",
      message: 'Sách "React Advanced Patterns" vừa được thêm vào kho',
      time: "8 phút trước",
    },
    {
      id: "4",
      type: "order",
      message: "Đơn hàng #ORD-2024-006 đã được giao thành công",
      time: "12 phút trước",
    },
    {
      id: "5",
      type: "book",
      message: 'Cập nhật giá sách "TypeScript Handbook" từ 350k lên 380k',
      time: "15 phút trước",
    },
    {
      id: "6",
      type: "user",
      message: 'Khách hàng "Lê Văn Cường" vừa cập nhật thông tin cá nhân',
      time: "18 phút trước",
    },
    {
      id: "7",
      type: "order",
      message: 'Đơn hàng #ORD-2024-005 đã chuyển sang trạng thái "Đang giao"',
      time: "22 phút trước",
    },
    {
      id: "8",
      type: "book",
      message: 'Sách "JavaScript: The Good Parts" tạm hết hàng',
      time: "25 phút trước",
    },
  ];
};
