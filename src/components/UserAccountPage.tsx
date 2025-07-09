import React, { useState, useEffect } from "react";
import "./UserAccountPage.css";
import { AccountSidebar } from "./AccountSidebar";
import { AccountMainContent } from "./AccountMainContent";
import { Header, Footer } from "./index";
import { getUserById } from "../services/userService";
import { getOrdersByUserId } from "../services/orderService";
import { useNavigate } from "react-router-dom";

export type AccountSection =
  | "profile"
  | "orders"
  | "reviews"
  | "referrals"
  | "giftcards"
  | "address";

export interface Address {
  id: number;
  recipientName: string;
  phoneNumber: string;
  addressLine: string;
  default?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  addresses?: Address[];
  gender?: string;
  birthday?: string;
}

export interface OrderDTO {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  // Thêm các trường khác nếu cần
}

export interface Review {
  id: string;
  content?: string;
  rating: number;
  createdAt?: string;
  book?: {
    id: number;
    title: string;
    imageUrl?: string;
  };
  image?: string;
  bookTitle?: string;
}

export interface Credit {
  type: string;
  label: string;
}

export const UserAccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      window.dispatchEvent(new Event("show-auth-modal"));
      return;
    }
    getUserById(userId)
      .then((data) => {
        if (data.error) {
          window.dispatchEvent(new Event("show-auth-modal"));
        } else {
          setUser(data);
          getOrdersByUserId(userId)
            .then(setOrders)
            .catch(() => setOrders([]));
        }
      })
      .catch(() => {
        window.dispatchEvent(new Event("show-auth-modal"));
      });
  }, []);

  const refreshUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserById(userId).then(setUser);
    }
  };

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: "1",
      bookTitle: "The Silent Patient",
      rating: 3,
      image: "https://placehold.co/56x56/e6ddd2/e6ddd2",
    },
    {
      id: "2",
      bookTitle: "Where the Crawdads Sing",
      rating: 4,
      image: "https://placehold.co/56x56/b8956e/b8956e",
    },
    {
      id: "3",
      bookTitle: "The Nightingale",
      rating: 5,
      image: "https://placehold.co/56x56/d4b896/d4b896",
    },
    {
      id: "4",
      bookTitle: "The Girl on the Train",
      rating: 4,
      image: "https://placehold.co/56x56/c2a078/c2a078",
    },
  ];

  // Sample credits data
  const credits: Credit[] = [
    { type: "credit", label: "Bookstore credit" },
    { type: "expiring", label: "Expiring soon" },
    { type: "refund", label: "Order refund" },
    { type: "expiring", label: "Expiring soon" },
  ];

  return (
    <>
      <Header />
      <div className="user-account-page">
        <div className="account-container">
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <AccountMainContent
            activeSection={activeSection}
            user={user || { id: 0, name: "", email: "", phoneNumber: "" }}
            orders={orders}
            reviews={reviews}
            credits={credits}
            onUserRefresh={refreshUser}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
