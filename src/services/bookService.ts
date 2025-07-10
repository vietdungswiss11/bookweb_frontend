import API_BASE_URL from './apiConfig';

const API_URL = `${API_BASE_URL}/books`;
const ADMIN_API_URL = `${API_BASE_URL}/admin/books`;

export async function getAllBooks(params?: any) {
    let url = API_URL;
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

export async function getBookById(bookId: string | number) {
    const res = await fetch(`${API_URL}/${bookId}`);
    return res.json();
}

export async function searchBooks(params: any) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/search?${query}`);
    return res.json();
}

export async function getBooksOnSale(params?: any) {
    let url = `${API_URL}/sale`;
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

export async function getRelatedBooks(bookId: number, limit = 5) {
    const res = await fetch(`${API_URL}/${bookId}/related?limit=${limit}`);
    return res.json();
} 