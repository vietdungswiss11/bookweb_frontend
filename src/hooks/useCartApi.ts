import { useState, useCallback } from "react";
import API_BASE_URL from "../services/apiConfig";

export function useCartApi(userId: string) {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const getAuthHeaders = (): Record<string, string> => {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // Lấy giỏ hàng
    const fetchCart = useCallback(async () => {
        setLoading(true);
        const headers: Record<string, string> = {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        };
        const res = await fetch(`${API_BASE_URL}/users/${userId}/cart`, {
            headers
        });
        const data = await res.json();
        setCart(data);
        setLoading(false);
    }, [userId]);

    // Thêm sản phẩm vào giỏ (dùng bookId)
    const addToCart = useCallback(async (bookId: string | number, quantity: number = 1) => {
        setLoading(true);
        const headers = getAuthHeaders();
        await fetch(`${API_BASE_URL}/users/${userId}/cart/items/${bookId}?quantity=${quantity}`, {
            method: "POST",
            headers
        });
        await fetchCart();
        setLoading(false);
    }, [userId, fetchCart]);

    // Cập nhật số lượng (dùng cartItemId)
    const updateCartItem = useCallback(async (cartItemId: string | number, quantity: number) => {
        setLoading(true);
        const headers = getAuthHeaders();
        await fetch(`${API_BASE_URL}/users/${userId}/cart/items/${cartItemId}?quantity=${quantity}`, {
            method: "PUT",
            headers
        });
        await fetchCart();
        setLoading(false);
    }, [userId, fetchCart]);

    // Xóa sản phẩm khỏi giỏ (dùng cartItemId)
    const removeCartItem = useCallback(async (cartItemId: string | number) => {
        setLoading(true);
        const headers = getAuthHeaders();
        await fetch(`${API_BASE_URL}/users/${userId}/cart/items/${cartItemId}`, {
            method: "DELETE",
            headers
        });
        await fetchCart();
        setLoading(false);
    }, [userId, fetchCart]);

    // Xóa toàn bộ giỏ hàng
    const clearCart = useCallback(async () => {
        setLoading(true);
        const headers = getAuthHeaders();
        await fetch(`${API_BASE_URL}/users/${userId}/cart`, {
            method: "DELETE",
            headers
        });
        await fetchCart();
        setLoading(false);
    }, [userId, fetchCart]);

    return {
        cart,
        loading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
    };
} 