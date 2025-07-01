import React from "react";
import { TrendingUp } from "lucide-react";
import { getRevenueData } from "../services/mockData";
import "./RevenueChart.css";

const RevenueChart: React.FC = () => {
  const data = getRevenueData();
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Doanh thu 7 ngày gần đây</h3>
          <p className="chart-subtitle">
            Theo dõi xu hướng doanh thu hàng ngày
          </p>
        </div>
        <div className="chart-stats">
          <div className="chart-stat">
            <TrendingUp size={16} className="stat-icon positive" />
            <span className="stat-text">+12.5% so với tuần trước</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-grid">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div className="chart-value">
                {(item.value / 1000000).toFixed(1)}M
              </div>
              <div className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
              <div className="chart-label">{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
