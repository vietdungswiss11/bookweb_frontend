import { authFetch } from "./authFetch";

export async function getReviewsByBookId(bookId: number | string) {
    const res = await authFetch(`http://localhost:8080/reviews/book/${bookId}`);
    return res.json();
}

export async function getReviewsByUserId(userId: number | string) {
    const res = await authFetch(`http://localhost:8080/reviews/user/${userId}`);
    return res.json();
}

export async function createReview(reviewDTO: any) {
    const res = await authFetch(`http://localhost:8080/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewDTO)
    });
    return res.json();
}

export async function updateReview(id: number, reviewDTO: any) {
    const res = await authFetch(`http://localhost:8080/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewDTO)
    });
    return res.json();
}

export async function deleteReview(id: number) {
    const res = await authFetch(`http://localhost:8080/reviews/${id}`, {
        method: 'DELETE'
    }
    );
    return res.ok;
} 