import React from "react";
import { getOrderStatusData } from "../services/mockData";
import "./OrderStatusPie.css";

const OrderStatusPie: React.FC = () => {
  const data = getOrderStatusData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercentage = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = cumulativePercentage * 3.6; // Convert to degrees
    cumulativePercentage += percentage;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: cumulativePercentage * 3.6,
    };
  });

  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(50, 50, 40, endAngle);
    const end = polarToCartesian(50, 50, 40, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M 50,50 L ${start.x},${start.y} A 40,40 0 ${largeArcFlag},0 ${end.x},${end.y} z`;
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="order-status-pie">
      <div className="pie-header">
        <h3 className="pie-title">Trạng thái đơn hàng</h3>
        <p className="pie-subtitle">Phân bố theo tỷ lệ phần trăm</p>
      </div>

      <div className="pie-content">
        <div className="pie-chart-container">
          <svg viewBox="0 0 100 100" className="pie-chart">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="pie-segment"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </svg>
          <div className="pie-center">
            <span className="pie-total">{total}</span>
            <span className="pie-total-label">Tổng đơn</span>
          </div>
        </div>

        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: item.color }}
              />
              <div className="legend-content">
                <span className="legend-label">{item.label}</span>
                <div className="legend-stats">
                  <span className="legend-value">{item.value}</span>
                  <span className="legend-percentage">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPie;
