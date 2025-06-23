import React from "react";
import "./OrderItem.css";
import { Order } from "./UserAccountPage";

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "shipped":
        return "Shipped";
      case "in-transit":
        return "In transit";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="order-item">
      <div className="order-content">
        <img src={order.image} alt="Order item" className="order-image" />
        <div className="order-details">
          <div className="order-title">
            {getStatusDisplayName(order.status)}
          </div>
          <div className="order-info">
            Order {order.orderNumber}. Arriving {order.deliveryDate}
          </div>
        </div>
      </div>
      <div className="order-arrow">
        <div className="arrow-container">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="chevron-right"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.03062 9.53063L1.53063 17.0306C1.23757 17.3237 0.762431 17.3237 0.469375 17.0306C0.176318 16.7376 0.176318 16.2624 0.469375 15.9694L7.43969 9L0.469375 2.03062C0.176318 1.73757 0.176318 1.26243 0.469375 0.969375C0.762431 0.676319 1.23757 0.676319 1.53063 0.969375L9.03062 8.46937C9.17146 8.61005 9.25059 8.80094 9.25059 9C9.25059 9.19906 9.17146 9.38995 9.03062 9.53063Z"
              fill="#171412"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
