import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const menu = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Quản lý sách', path: '/admin/books' },
    { label: 'Quản lý đơn hàng', path: '/admin/orders' },
    { label: 'Quản lý người dùng', path: '/admin/users' },
];

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-title">Admin Panel</div>
            <ul className="sidebar-menu">
                {menu.map(item => (
                    <li
                        key={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default AdminSidebar; 