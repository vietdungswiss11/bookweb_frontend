import React, { useState } from "react";
import "./PaymentMethodSelector.css";

export interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  bankType: string;
  onBankTypeChange: (type: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  bankType,
  onBankTypeChange,
}) => {
  return (
    <div className="payment-method-selector">
      <h3 className="payment-title">Phương thức thanh toán</h3>

      <div className="payment-options">
        {/* COD Option */}
        <label
          className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => onPaymentMethodChange("cod")}
          />
          <div className="payment-option-content">
            <div className="payment-icon cod-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="payment-info">
              <span className="payment-name">
                Thanh toán khi nhận hàng (COD)
              </span>
              <span className="payment-desc">
                Thanh toán bằng tiền mặt khi nhận hàng
              </span>
            </div>
          </div>
        </label>

        {/* Bank Transfer Option */}
        <label
          className={`payment-option ${paymentMethod === "bank" ? "selected" : ""}`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => onPaymentMethodChange("bank")}
          />
          <div className="payment-option-content">
            <div className="payment-icon bank-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="2"
                  y1="20"
                  x2="22"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="2"
                  y1="8"
                  x2="22"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="payment-info">
              <span className="payment-name">Chuyển khoản ngân hàng</span>
              <span className="payment-desc">
                Thanh toán qua chuyển khoản hoặc ví điện tử
              </span>
            </div>
          </div>
        </label>

        {/* Bank Transfer Sub-options */}
        {paymentMethod === "bank" && (
          <div className="bank-options">
            <h4 className="bank-options-title">
              Chọn phương thức chuyển khoản:
            </h4>

            {/* Momo */}
            <label
              className={`bank-option ${bankType === "momo" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="bankType"
                value="momo"
                checked={bankType === "momo"}
                onChange={() => onBankTypeChange("momo")}
              />
              <div className="bank-option-content">
                <div className="bank-logo momo-logo">
                  <span>MoMo</span>
                </div>
                <span className="bank-name">Ví MoMo</span>
              </div>
            </label>

            {/* VNPAY */}
            <label
              className={`bank-option ${bankType === "vnpay" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="bankType"
                value="vnpay"
                checked={bankType === "vnpay"}
                onChange={() => onBankTypeChange("vnpay")}
              />
              <div className="bank-option-content">
                <div className="bank-logo vnpay-logo">
                  <span>VNPAY</span>
                </div>
                <span className="bank-name">VNPAY</span>
              </div>
            </label>

            {/* Manual Bank Transfer */}
            <label
              className={`bank-option ${bankType === "manual" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="bankType"
                value="manual"
                checked={bankType === "manual"}
                onChange={() => onBankTypeChange("manual")}
              />
              <div className="bank-option-content">
                <div className="bank-logo bank-logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 21H21M5 21V7L12 3L19 7V21M9 9H15M9 13H15M9 17H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="bank-name">Chuyển khoản ngân hàng</span>
              </div>
            </label>

            {/* Bank Transfer Details */}
            {bankType === "manual" && (
              <div className="bank-transfer-details">
                <div className="bank-info">
                  <h5>Thông tin chuyển khoản:</h5>
                  <div className="bank-account-info">
                    <p>
                      <strong>Ngân hàng:</strong> Vietcombank (VCB)
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> 1234567890
                    </p>
                    <p>
                      <strong>Chủ tài khoản:</strong> CÔNG TY TNHH BOOKSTORE
                    </p>
                    <p>
                      <strong>Nội dung:</strong> [Mã đơn hàng] - [Họ tên]
                    </p>
                  </div>

                  <div className="qr-code-section">
                    <h6>Quét mã QR để chuyển khoản:</h6>
                    <div className="qr-code-placeholder">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                      >
                        <rect
                          width="120"
                          height="120"
                          fill="#f0f0f0"
                          stroke="#ddd"
                          strokeWidth="1"
                        />
                        <text
                          x="60"
                          y="65"
                          textAnchor="middle"
                          fontSize="12"
                          fill="#666"
                        >
                          QR Code
                        </text>
                      </svg>
                      <p className="qr-note">
                        Mã QR sẽ được tạo sau khi đặt hàng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
