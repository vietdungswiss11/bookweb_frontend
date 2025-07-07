import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default RequireAdmin; 