import { authFetch } from "./authFetch";

const API_URL = 'http://localhost:8080/users';

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