import { authFetch } from "./authFetch";
import API_BASE_URL from './apiConfig';

const API_URL = `${API_BASE_URL}/categories`;

export async function getAllCategories() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function getCategoryById(categoryId: string | number) {
    const res = await fetch(`${API_URL}/${categoryId}`);
    return res.json();
}

export async function createCategory(data: any) {
    const res = await authFetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateCategory(categoryId: string | number, data: any) {
    const res = await authFetch(`${API_URL}/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteCategory(categoryId: string | number) {
    const res = await authFetch(`${API_URL}/${categoryId}`, {
        method: 'DELETE'
    });
    return res.ok;
}

export async function getBooksByCategoryId(categoryId: string | number, params?: any) {
    let url = `${API_URL}/${categoryId}/books`;
    if (params) {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) query.append(key, String(value));
        });
        url += `?${query.toString()}`;
    }
    const res = await fetch(url);
    return res.json();
} 