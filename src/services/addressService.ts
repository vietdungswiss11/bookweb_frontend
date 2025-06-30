const API_URL = 'http://localhost:8080/addresses';

export interface AddressPayload {
    recipientName: string;
    phoneNumber: string;
    addressLine: string;
}

export async function addAddress(userId: string | number, address: AddressPayload) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/user/${userId}`, {
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