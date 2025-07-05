import React from "react";
import {
  Package,
  Users,
  Book,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: "package" | "users" | "book" | "dollar-sign";
  color: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => {
  const getIcon = () => {
    const iconProps = { size: 24, color };

    switch (icon) {
      case "package":
        return <Package {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "book":
        return <Book {...iconProps} />;
      case "dollar-sign":
        return <DollarSign {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  };

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return val.toLocaleString("vi-VN");
    }
    return val;
  };

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
          {getIcon()}
        </div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend >= 0 ? "positive" : "negative"}`} style={{ marginTop: 8 }}>
            {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{formatValue(value)}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
