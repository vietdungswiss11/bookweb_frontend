import { authFetch } from "./authFetch";
import API_BASE_URL from './apiConfig';

const API_URL = `${API_BASE_URL}/users`;

export async function getAllUsers() {
    const res = await authFetch(API_URL);
    return res.json();
}

export async function getUserById(userId: string | number) {
    const token = localStorage.getItem('token');
    const res = await authFetch(`${API_URL}/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function createUser(data: any) {
    const res = await authFetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateUser(userId: string | number, data: any) {
    const res = await authFetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteUser(userId: string | number) {
    const res = await authFetch(`${API_URL}/${userId}`, {
        method: 'DELETE'
    });
    return res.ok;
}

export async function changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/users/${userId}/change-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Đổi mật khẩu thất bại!');
    }
    return data.message;
} 