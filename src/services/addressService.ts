import { authFetch } from "./authFetch";

const API_URL = 'http://localhost:8080/addresses';

export interface AddressPayload {
    id?: number;
    addressLine: string;
    phoneNumber: string;
    recipientName: string;
    default?: boolean;
}

export async function addAddress(userId: string | number, address: AddressPayload) {
    const token = localStorage.getItem('token');
    const res = await authFetch(`${API_URL}/user/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(address)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to add address' }));
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return res.json();
}

export async function getAddresses(userId: string | number): Promise<AddressPayload[]> {
    const token = localStorage.getItem('token');
    const res = await authFetch(`${API_URL}/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch addresses');
    }
    return res.json();
} 