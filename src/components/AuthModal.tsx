import React, { useState } from 'react';
import './AuthModal.css';
import { signin, signup, forgotPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import API_BASE_URL from '../services/apiConfig';

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
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMsg, setForgotMsg] = useState<string | null>(null);
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
                localStorage.setItem('user', JSON.stringify({
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    roles: res.roles
                }));
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

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotMsg(null);
        setLoading(true);
        try {
            const res = await forgotPassword(forgotEmail);
            if (res.success) {
                setForgotMsg('Mật khẩu mới đã được gửi về email của bạn!');
            } else {
                setForgotMsg(res.message || 'Không tìm thấy email hoặc lỗi gửi mail!');
            }
        } catch (err) {
            setForgotMsg('Lỗi kết nối server!');
        }
        setLoading(false);
    };
    //google login (oauth login)
    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: credentialResponse.credential }),
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
                if (data.id) localStorage.setItem('userId', data.id);
                localStorage.setItem('user', JSON.stringify({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    roles: data.roles
                }));
                setSuccess('Đăng nhập Google thành công!');
                setTimeout(() => {
                    setSuccess(null);
                    onClose();
                    navigate('/');
                }, 1000);
            } else {
                setError(data.message || 'Đăng nhập Google thất bại!');
            }
        } catch (err) {
            setError('Lỗi kết nối server!');
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <div className="auth-tabs">
                    <div className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Đăng nhập</div>
                    <div className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Đăng ký</div>
                </div>
                {tab === 'login' ? (
                    showForgot ? (
                        <form className="auth-form" onSubmit={handleForgotPassword}>
                            <label>Nhập email để nhận mật khẩu mới</label>
                            <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                            {forgotMsg && <div style={{ color: forgotMsg.includes('gửi') ? 'green' : 'red', fontSize: 14 }}>{forgotMsg}</div>}
                            <div className="auth-btn-row">
                                <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Đang gửi...' : 'Gửi mật khẩu mới'}</button>
                                <button type="button" className="auth-back-btn" onClick={() => { setShowForgot(false); setForgotMsg(null); }}>Quay lại</button>
                            </div>
                        </form>
                    ) : (
                        <form className="auth-form" onSubmit={handleLogin}>
                            <label>Email</label>
                            <input type="email" value={loginInfo.username} onChange={e => setLoginInfo({ ...loginInfo, username: e.target.value })} />
                            <label>Mật khẩu</label>
                            <div className="password-input-wrapper">
                                <input type={showPassword ? 'text' : 'password'} value={loginInfo.password} onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} />
                                <button type="button" className="show-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
                            </div>
                            <div className="auth-form-footer">
                                <a href="#" className="forgot-link" onClick={e => { e.preventDefault(); setShowForgot(true); }}>Quên mật khẩu?</a>
                            </div>
                            {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
                            {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}
                            <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
                            <div style={{ margin: '16px 0', textAlign: 'center' }}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={() => setError('Đăng nhập Google thất bại!')}
                                    width="100%"
                                />
                            </div>
                        </form>
                    )
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