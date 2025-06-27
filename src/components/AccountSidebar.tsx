import React from "react";
import "./AccountSidebar.css";
import { AccountSection } from "./UserAccountPage";

interface AccountSidebarProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const sidebarItems = [
    { id: "profile" as AccountSection, label: "Profile" },
    { id: "orders" as AccountSection, label: "Orders" },
    { id: "reviews" as AccountSection, label: "Reviews" },
    { id: "address" as AccountSection, label: "Địa chỉ" },
    { id: "referrals" as AccountSection, label: "Referrals" },
    { id: "giftcards" as AccountSection, label: "Gift Cards" },
  ];

  return (
    <div className="account-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-navigation">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span className="sidebar-item-text">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
