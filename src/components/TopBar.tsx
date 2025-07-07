import React from 'react';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();
    return (
        <div className="top-bar">
            <div className="top-bar-content">
                <p>THỨ 4 NGÀY VÀNG - FREESHIP NGẬP TRÀN</p>
                <div className="top-bar-promo">
                    <span>ÁP DỤNG CHO ĐƠN HÀNG 50K</span>
                    <button onClick={() => navigate('/category/tat-ca')}>MUA NGAY</button>
                </div>
            </div>
        </div>
    );
};

export default TopBar; 