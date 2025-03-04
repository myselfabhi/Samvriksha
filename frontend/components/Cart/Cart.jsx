// import React, { useState } from "react";
// import styles from "./Cart.module.css";
// import { useCart } from "../../src/CartContext";
// import CheckoutModal from "../CheckoutModal/CheckoutModal";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../src/AuthContext";
// import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [orderData, setOrderData] = useState(null);
//   const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
 
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     setIsModalOpen(true);
//   };

//   const handleOrderCreated = (newOrder) => {
//     setIsModalOpen(false);
//     setIsOrderConfirmed(true);
//     setTimeout(() => {
//       setIsOrderConfirmed(false);
//       window.location.reload();
//       // navigate("/orders");
//     }, 3000); // Auto-close after 3 seconds
//   };

//   const totalPrice = cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.cartHeader}>Your Cart</h2>
//       {Array.isArray(cart) && cart.length === 0 ? (
//         <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty</p>
//       ) : (
//         <>
//           {Array.isArray(cart) &&
//             cart.length > 0 &&
//             cart.map((item, index) => (
//               <div key={index} className={styles.cartItem}>
//                 {/* Image with fallback */}
//                 <img
//                   src={item?.product?.img?.[0] || "fallback-image-url.jpg"} // Fallback image
//                   alt={item?.product?.name || "Product Image"} // Fallback name
//                   className={styles.itemImage}
//                 />

//                 <div className={styles.itemDetails}>
//                   <p className={styles.itemName}>{item?.product?.name}</p>
//                   <p className={styles.itemPrice}>Price: ₹{item?.product?.price}</p>
//                   {item?.selectedColor ? (
//                     <div
//                       className={styles.selectedColor}
//                       style={{ backgroundColor: item.selectedColor }}
//                     ></div>
//                   ) : null}
//                 </div>

//                 <div className={styles.itemControls}>
//                   <div className={styles.quantityControl}>
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.product._id, item.selectedColor, item.quantity - 1)
//                       }
//                     >
//                       -
//                     </button>
//                     <span style={{ fontFamily: "Franklin Gothic" }}>{item?.quantity}</span>
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.product._id, item.selectedColor, item.quantity + 1)
//                       }
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     className={styles.removeButton}
//                     onClick={() => removeFromCart(item.product._id, item.selectedColor)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           <h3 className={styles.cartTotal}>Total: ₹{totalPrice}</h3>
//           <button
//             className={styles.checkoutButton}
//             onClick={user ? handleCheckout : () => navigate("/login")}
//           >
//             Proceed to Checkout
//           </button>
//         </>
//       )}
//       <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOrderCreated={handleOrderCreated}/>
//       <OrderConfirmModal isOpen={isOrderConfirmed} onClose={() => setIsOrderConfirmed(false)} />
//       {/* <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOrderCreated={handleOrderCreated} /> */}
//     </div>
//   );
// };

// export default Cart;


import React, { useState } from "react";
import styles from "./Cart.module.css";
import { useCart } from "../../src/CartContext";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/AuthContext";
import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(cart)

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleOrderCreated = (newOrder) => {
    setIsModalOpen(false);
    setIsOrderConfirmed(true);
    setTimeout(() => {
      setIsOrderConfirmed(false);
      window.location.reload();
    }, 3000); // Auto-close after 3 seconds
  };

  // Safely calculate total price
  const totalPrice = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  // Handle loading or empty cart state
  if (!cart) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading cart...</p>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Your Cart</h2>
      {!cart || cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              {/* Product Image */}
              <div className={styles.itemInfo}>

              
              <img
                src={item?.productId?.img?.[0] || "fallback-image-url.jpg"}
                alt={item?.productId?.name || "Product Image"}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <p className={styles.itemName}>{item?.productId?.name}</p>
                <p className={styles.itemPrice}>Price: ₹{item.price}</p>
                {item.variant && <p>Variant: {item.variant}</p>}
                {item.size && <p>Size: {item.size}</p>}
                {item.design && <p>Design: {item.design}</p>}
                {item.color && (
                  <div
                    className={styles.selectedColor}
                    style={{ backgroundColor: item.color }}
                  ></div>
                )}
                {item.additionalOptions?.length > 0 && (
                  <div>
                    <p>Additional Options:</p>
                    <ul>
                      {item.additionalOptions.map((option, idx) => (
                        <li style={{listStyle:'none'}} key={idx}>
                          {option.name} (+₹{option.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              </div>

              <div className={styles.itemControls}>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId._id,
                        item.variant,
                        item.size,
                        item.design,
                        item.color,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span style={{ fontFamily: "Franklin Gothic" }}>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId._id,
                        item.variant,
                        item.size,
                        item.design,
                        item.color,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() =>
                    removeFromCart(
                      item.productId._id,
                      item.variant,
                      item.size,
                      item.design,
                      item.color
                    )
                  }
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
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderCreated={handleOrderCreated}
      />
      <OrderConfirmModal
        isOpen={isOrderConfirmed}
        onClose={() => setIsOrderConfirmed(false)}
      />
    </div>
  );
};

export default Cart;