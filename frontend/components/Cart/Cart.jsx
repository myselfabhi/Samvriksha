import React, { useState } from "react";
import styles from "./Cart.module.css";
import { useCart } from "../../src/CartContext";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleOrderCreated = (newOrder) => {
    setOrderData(newOrder); // Optionally, show order confirmation or redirect
  };

  const totalPrice = cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Your Cart</h2>
      {Array.isArray(cart) && cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty</p>
      ) : (
        <>
          {Array.isArray(cart) &&
            cart.length > 0 &&
            cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                {/* Image with fallback */}
                <img
                  src={item?.product?.img?.[0] || "fallback-image-url.jpg"} // Fallback image
                  alt={item?.product?.name || "Product Image"} // Fallback name
                  className={styles.itemImage}
                />

                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item?.product?.name}</p>
                  <p className={styles.itemPrice}>Price: ₹{item?.product?.price}</p>
                  {item?.selectedColor ? (
                    <div
                      className={styles.selectedColor}
                      style={{ backgroundColor: item.selectedColor }}
                    ></div>
                  ) : null}
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.selectedColor, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span style={{ fontFamily: "Franklin Gothic" }}>{item?.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.selectedColor, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.product._id, item.selectedColor)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <h3 className={styles.cartTotal}>Total: ₹{totalPrice}</h3>
          <button
            className={styles.checkoutButton}
            onClick={user ? handleCheckout : () => navigate("/login")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOrderCreated={handleOrderCreated} />
    </div>
  );
};

export default Cart;



