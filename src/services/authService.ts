const API_URL = 'http://localhost:8080/auth';

export async function signin(email: string, password: string) {
    const res = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token && data.refreshToken) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
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