import React, { useState, useEffect } from "react";
import { useCart } from "../../src/CartContext";
import { useAuth } from "../../src/AuthContext"; // Assuming you have user context for fetching user data
import axios from "axios";
import styles from "./CheckoutModal.module.css";

const CheckoutModal = ({ isOpen, onClose, onOrderCreated }) => {
  const { cart, setCart } = useCart();
  const { user } = useAuth(); // Assuming user data is fetched and stored in context
  const [contactDetails, setContactDetails] = useState({
    contactNo: user?.contactNo || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
  });

  const handleSubmit = async () => {
    const orderData = {
      user: user._id,
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      contactDetails,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/orders", orderData);
      onOrderCreated(response.data);
      setCart([])  
      localStorage.removeItem("cart")
      onClose(); // Close the modal after order is created
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.checkoutModal}>
      <div className={styles.checkoutModalContent}>
        <h2 className={styles.checkoutModalHeader}>Confirm Your Details</h2>
        <form className={styles.checkoutModalForm}>
          <div>
            <label className={styles.checkoutModalLabel}>Contact Number</label>
            <input
              className={styles.checkoutModalInput}
              type="text"
              value={contactDetails.contactNo}
              onChange={(e) => setContactDetails({ ...contactDetails, contactNo: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.checkoutModalLabel}>Address</label>
            <textarea
              className={styles.checkoutModalTextarea}
              value={contactDetails.address}
              onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.checkoutModalLabel}>Pincode</label>
            <input
              className={styles.checkoutModalInput}
              type="text"
              value={contactDetails.pincode}
              onChange={(e) => setContactDetails({ ...contactDetails, pincode: e.target.value })}
            />
          </div>
          <div className={styles.checkoutModalFooter}>
            <button
              type="button"
              className={styles.checkoutModalButton}
              onClick={handleSubmit}
            >
              Confirm Order
            </button>
            <button
              type="button"
              className={styles.checkoutModalCancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
