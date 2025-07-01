import React from "react";
import { ShoppingCart, User, BookOpen, AlertCircle } from "lucide-react";
import { getRecentActivities } from "../services/mockData";
import "./RecentActivity.css";

const RecentActivity: React.FC = () => {
  const activities = getRecentActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart size={16} />;
      case "user":
        return <User size={16} />;
      case "book":
        return <BookOpen size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "order":
        return "#3b82f6";
      case "user":
        return "#10b981";
      case "book":
        return "#f59e0b";
      default:
        return "#64748b";
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3 className="activity-title">Hoạt động gần đây</h3>
        <p className="activity-subtitle">Cập nhật mới nhất từ hệ thống</p>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div
              className="activity-icon"
              style={{
                backgroundColor: `${getActivityColor(activity.type)}20`,
                color: getActivityColor(activity.type),
              }}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-message">{activity.message}</p>
              <span className="activity-time">{formatTime(activity.time)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-footer">
        <button className="view-all-activity-btn">Xem tất cả hoạt động</button>
      </div>
    </div>
  );
};

export default RecentActivity;
