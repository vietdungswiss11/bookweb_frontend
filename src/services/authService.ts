const API_URL = 'http://localhost:8080/auth';

export async function signin(email: string, password: string) {
    const res = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function signup(email: string, password: string, confirmPassword: string, phoneNumber: string, name: string) {
    const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            confirmPassword,
            phoneNumber,
            name
        })
    });
    return res.json();
} 