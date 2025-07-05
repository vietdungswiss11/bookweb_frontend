import React from "react";
import { Bell, Settings, User } from "lucide-react";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import OrderStatusPie from "./components/OrderStatusPie";
import RecentOrdersTable from "./components/RecentOrdersTable";
import RecentActivity from "./components/RecentActivity";
import { getDashboardStats } from "./services/mockData";
import "./Dashboard.css";
import BooksPage from "./BooksPage";
import UsersPage from "./UsersPage";
import OrdersPage from "./OrdersPage";
import AdminSidebar from "./components/AdminSidebar";

const Dashboard: React.FC = () => {
  const stats = getDashboardStats();

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Bảng điều khiển</h1>
          <div className="dashboard-header-actions">
            <button className="header-action-btn">
              <Bell size={20} />
            </button>
            <button className="header-action-btn">
              <Settings size={20} />
            </button>
            <div className="admin-avatar">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="stats-section">
          <div className="stats-grid">
            <StatCard
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              icon="package"
              color="#3b82f6"
              trend={8.5}
            />
            <StatCard
              title="Tổng người dùng"
              value={stats.totalUsers}
              icon="users"
              color="#10b981"
              trend={12.3}
            />
            <StatCard
              title="Tổng số sách"
              value={stats.totalBooks}
              icon="book"
              color="#f59e0b"
              trend={-2.1}
            />
            <StatCard
              title="Doanh thu tháng này"
              value={`${stats.monthlyRevenue.toLocaleString("vi-VN")}₫`}
              icon="dollar-sign"
              color="#ef4444"
              trend={15.7}
            />
          </div>
        </section>

        <section className="charts-section">
          <div className="charts-grid">
            <div className="chart-card large">
              <RevenueChart />
            </div>
            <div className="chart-card small">
              <OrderStatusPie />
            </div>
          </div>
        </section>

        <section className="data-section">
          <div className="data-grid">
            <div className="data-card large">
              <RecentOrdersTable />
            </div>
            <div className="data-card small">
              <RecentActivity />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
