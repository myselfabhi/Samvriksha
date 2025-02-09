import React, { useState, useEffect } from "react";
import { useCart } from "../../src/CartContext";
import { useAuth } from "../../src/AuthContext";
import axios from "axios";
import styles from "./CheckoutModal.module.css";

const CheckoutModal = ({ isOpen, onClose, onOrderCreated }) => {
  const { cart, setCart } = useCart();
  const {user} = useAuth()
  const [contactDetails, setContactDetails] = useState({
    contactNo: "",
    address: "",
    pincode: "",
  });

  // useEffect(() => {
  //   const savedDetails = JSON.parse(localStorage.getItem("contactDetails"));
  //   if (savedDetails) {
  //     setContactDetails(savedDetails);
  //   }
  // }, []);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  useEffect(() => {
    // Load saved contact details from local storage
    const savedDetails = JSON.parse(localStorage.getItem("contactDetails"));
    if (savedDetails) {
      setContactDetails(savedDetails);
    }

    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Save contact details to local storage
      localStorage.setItem("contactDetails", JSON.stringify(contactDetails));

      // Create order on backend
      const orderResponse = await axios.post("http://localhost:3000/api/orders", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { order, razorpayOrder } = orderResponse.data;

      // Open Razorpay payment modal
      const options = {
        key: "rzp_test_YdGeAGIdZWPXpJ", // Replace with actual key
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Samvriksha",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post("http://localhost:3000/api/orders/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });

            onOrderCreated(verifyResponse.data);
            setCart([]);
            localStorage.removeItem("cart");
            onClose();
          } catch (error) {
            console.error("Payment verification failed", error);
          }
        },
        prefill: {
          contact: contactDetails.contactNo,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment", error);
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
          <div className={styles.modalPrice}>Amount to Pay: ₹{totalAmount}</div>
          <div className={styles.checkoutModalFooter}>
            <button type="button" className={styles.checkoutModalButton} onClick={handlePayment}>
              Proceed to Payment
            </button>
            <button type="button" className={styles.checkoutModalCancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;



