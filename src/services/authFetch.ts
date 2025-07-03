const API_URL = "http://localhost:8080";

async function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Refresh token failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data.token;
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
    let token = localStorage.getItem("token");
    if (!init.headers) init.headers = {};
    (init.headers as any)["Authorization"] = `Bearer ${token}`;
    (init.headers as any)["Content-Type"] = "application/json";

    let response = await fetch(input, init);

    if (response.status === 401) {
        try {
            token = await refreshToken();
            (init.headers as any)["Authorization"] = `Bearer ${token}`;
            response = await fetch(input, init); // retry lại request cũ
        } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "auth/signin";
            throw err;
        }
    }

    return response;
} 