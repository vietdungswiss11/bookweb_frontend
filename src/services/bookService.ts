const API_URL = 'http://localhost:8080/books';

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

export async function createBook(data: any) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateBook(bookId: string | number, data: any) {
    const res = await fetch(`${API_URL}/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteBook(bookId: string | number) {
    const res = await fetch(`${API_URL}/${bookId}`, {
        method: 'DELETE'
    });
    return res.ok;
}

export async function searchBooks(params: any) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/search?${query}`);
    return res.json();
}

export async function getBooksOnSale() {
    const res = await fetch(`${API_URL}/sale`);
    return res.json();
}

export async function getRelatedBooks(bookId: number, limit = 5) {
    const res = await fetch(`${API_URL}/${bookId}/related?limit=${limit}`);
    return res.json();
} 