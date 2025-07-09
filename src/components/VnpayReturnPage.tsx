import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getOrderByOrderNumber } from "../services/orderService";
import { useCartApi } from "../hooks/useCartApi";

const VnpayReturnPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId") || "";
    const { clearCart } = useCartApi(userId);

    useEffect(() => {
        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
        const orderNumber = searchParams.get("vnp_TxnRef");

        if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00" && orderNumber) {
            getOrderByOrderNumber(orderNumber)
                .then(async order => {
                    if (order && order.id) {
                        await clearCart();
                        navigate(`/order-success/${order.id}`);
                    } else {
                        navigate(`/order-fail?orderNumber=${orderNumber}`);
                    }
                })
                .catch(() => {
                    navigate(`/order-fail?orderNumber=${orderNumber}`);
                });
        } else {
            navigate(`/order-fail?orderNumber=${orderNumber || "unknown"}`);
        }
    }, [searchParams, navigate, clearCart]);

    return (
        <div style={{ textAlign: "center", marginTop: 80 }}>
            <h2>Đang xác nhận giao dịch VNPAY...</h2>
            <p>Vui lòng chờ trong giây lát.</p>
        </div>
    );
};

export default VnpayReturnPage;