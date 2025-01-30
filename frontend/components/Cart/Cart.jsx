// import React from "react";
// import styles from "./Cart.module.css";
// import { useCart } from "../../src/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className={styles.cartContainer}>
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <>
//           {cart.map((item, index) => (
//             <div key={index} className={styles.cartItem}>
//               <img src={item.img[0]} width={100} height={100} alt={item.name} />
//               <div className={styles.details}>
//                 <p>{item.name}</p>
//                 <p>Color: {item.selectedColor}</p>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <button onClick={() => removeFromCart(item.id, item.selectedColor)}>Remove</button>
//               </div>
//             </div>
//           ))}
//           <h3>Total: ₹{totalPrice}</h3>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import styles from "./Cart.module.css";
import { useCart } from "../../src/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <img src={item.img[0]} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>Price: ₹{item.price}</p>
                {item.selectedColor ? <div className={styles.selectedColor} style={{ backgroundColor: item.selectedColor }}></div> : null}
              </div>

              <div className={styles.itemControls}>
              <div className={styles.quantityControl}>
                <button onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}>-</button>
                <span style={{fontFamily:'Franklin Gothic'}}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}>+</button>
              </div>

              <button className={styles.removeButton} onClick={() => removeFromCart(item.id, item.selectedColor)}>
                Remove
              </button>
              </div>
            </div>
          ))}
          <h3 className={styles.cartTotal}>Total: ₹{totalPrice}</h3>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
