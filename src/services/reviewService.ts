export async function getReviewsByBookId(bookId: number | string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/reviews/book/${bookId}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    return res.json();
}

export async function getReviewsByUserId(userId: number | string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/reviews/user/${userId}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    return res.json();
} 