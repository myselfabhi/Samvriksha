import React from "react";
import styles from "./OrderConfirmModal.module.css";

const OrderConfirmModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us.</p>
        <button className={styles.okButton} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
