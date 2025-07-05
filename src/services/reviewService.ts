import { authFetch } from "./authFetch";

export async function getReviewsByBookId(bookId: number | string) {
    const res = await authFetch(`http://localhost:8080/reviews/book/${bookId}`);
    return res.json();
}

export async function getReviewsByUserId(userId: number | string) {
    const res = await authFetch(`http://localhost:8080/reviews/user/${userId}`);
    return res.json();
} 