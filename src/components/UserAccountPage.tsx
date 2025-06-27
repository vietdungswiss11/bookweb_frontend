import React, { useState } from "react";
import "./UserAccountPage.css";
import { AccountSidebar } from "./AccountSidebar";
import { AccountMainContent } from "./AccountMainContent";
import { Header } from "./index";

export type AccountSection =
  | "profile"
  | "orders"
  | "reviews"
  | "referrals"
  | "giftcards"
  | "address";

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  status: "shipped" | "in-transit" | "delivered";
  orderNumber: string;
  deliveryDate: string;
  image: string;
}

export interface Review {
  id: string;
  bookTitle: string;
  rating: number;
  image: string;
}

export interface Credit {
  type: string;
  label: string;
}

export const UserAccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");

  // Sample user data
  const user: User = {
    id: "1",
    name: "Jane Cooper",
    email: "jane.cooper@email.com",
    phoneNumber: "+1 (555) 123-4567",
  };

  // Sample orders data
  const orders: Order[] = [
    {
      id: "1",
      status: "shipped",
      orderNumber: "#12345",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/d4b5a0/d4b5a0",
    },
    {
      id: "2",
      status: "in-transit",
      orderNumber: "#12346",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/c8a882/c8a882",
    },
    {
      id: "3",
      status: "delivered",
      orderNumber: "#12347",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/b89c7a/b89c7a",
    },
    {
      id: "4",
      status: "delivered",
      orderNumber: "#12348",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/e8ddd4/e8ddd4",
    },
    {
      id: "5",
      status: "delivered",
      orderNumber: "#12349",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/d2c1a8/d2c1a8",
    },
    {
      id: "6",
      status: "delivered",
      orderNumber: "#12350",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/a89078/a89078",
    },
    {
      id: "7",
      status: "delivered",
      orderNumber: "#12351",
      deliveryDate: "May 15 - May 17",
      image: "https://placehold.co/56x56/c4a584/c4a584",
    },
  ];

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
            user={user}
            orders={orders}
            reviews={reviews}
            credits={credits}
          />
        </div>
      </div>
    </>
  );
};
