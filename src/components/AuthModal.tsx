import React, { useState } from 'react';
import './AuthModal.css';
import { signin, signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
    const [tab, setTab] = useState<'login' | 'register'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [registerInfo, setRegisterInfo] = useState({ username: '', password: '', confirmPassword: '', phone: '', name: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!open) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); setSuccess(null); setLoading(true);
        try {
            const res = await signin(loginInfo.username, loginInfo.password);
            if (res.token) {
                setSuccess('Đăng nhập thành công!');
                localStorage.setItem('token', res.token);
                if (res.id) localStorage.setItem('userId', res.id);
                setTimeout(() => {
                    setSuccess(null);
                    onClose();
                    navigate('/');
                }, 1000);
            } else {
                setError(res.message || 'Đăng nhập thất bại!');
            }
        } catch (err) {
            setError('Lỗi kết nối server!');
        }
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); setSuccess(null); setLoading(true);
        if (!registerInfo.username || !registerInfo.password || !registerInfo.confirmPassword || !registerInfo.name) {
            setError('Vui lòng nhập đầy đủ Email, Mật khẩu, Nhập lại mật khẩu và Họ tên!');
            setLoading(false);
            return;
        }
        if (registerInfo.password !== registerInfo.confirmPassword) {
            setError('Mật khẩu và Nhập lại mật khẩu phải giống nhau!');
            setLoading(false);
            return;
        }
        try {
            const res = await signup(
                registerInfo.username,
                registerInfo.password,
                registerInfo.confirmPassword,
                registerInfo.phone,
                registerInfo.name
            );
            if (res.success) {
                setSuccess('Đăng ký thành công!');
                setTimeout(() => { setSuccess(null); setTab('login'); }, 1000);
            } else {
                setError(res.message || 'Đăng ký thất bại!');
            }
        } catch (err) {
            setError('Lỗi kết nối server!');
        }
        setLoading(false);
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <div className="auth-tabs">
                    <div className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Đăng nhập</div>
                    <div className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Đăng ký</div>
                </div>
                {tab === 'login' ? (
                    <form className="auth-form" onSubmit={handleLogin}>
                        <label>Email</label>
                        <input type="email" value={loginInfo.username} onChange={e => setLoginInfo({ ...loginInfo, username: e.target.value })} />
                        <label>Mật khẩu</label>
                        <div className="password-input-wrapper">
                            <input type={showPassword ? 'text' : 'password'} value={loginInfo.password} onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} />
                            <button type="button" className="show-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
                        </div>
                        <div className="auth-form-footer">
                            <a href="#" className="forgot-link">Quên mật khẩu?</a>
                        </div>
                        {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
                        {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}
                        <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleRegister}>
                        <label>Email</label>
                        <input type="email" value={registerInfo.username} onChange={e => setRegisterInfo({ ...registerInfo, username: e.target.value })} required />
                        <label>Mật khẩu</label>
                        <div className="password-input-wrapper">
                            <input type={showPassword ? 'text' : 'password'} value={registerInfo.password} onChange={e => setRegisterInfo({ ...registerInfo, password: e.target.value })} required />
                            <button type="button" className="show-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
                        </div>
                        <label>Nhập lại mật khẩu</label>
                        <input type={showPassword ? 'text' : 'password'} value={registerInfo.confirmPassword} onChange={e => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })} required />
                        <label>Họ tên</label>
                        <input type="text" value={registerInfo.name || ''} onChange={e => setRegisterInfo({ ...registerInfo, name: e.target.value })} required />
                        <label>Số điện thoại</label>
                        <input type="tel" value={registerInfo.phone || ''} onChange={e => setRegisterInfo({ ...registerInfo, phone: e.target.value })} />
                        {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
                        {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}
                        <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</button>
                    </form>
                )}
                <button className="auth-modal-close" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default AuthModal; 