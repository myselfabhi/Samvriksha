import React, { useState, useEffect } from "react";
import { useCart } from "../../src/CartContext";
import { useAuth } from "../../src/AuthContext";
import axios from "axios";
import styles from "./CheckoutModal.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ isOpen, onClose, onOrderCreated }) => {
  const { cart, setCart } = useCart();
  const {user} = useAuth()
  const navigate = useNavigate();
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
    // const savedDetails = JSON.parse(localStorage.getItem("contactDetails"));
    // if (savedDetails) {
    //   setContactDetails(savedDetails);
    // }

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

  // const handlePayment = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found");
  //       return;
  //     }

  //     // Save contact details to local storage
  //     // localStorage.setItem("contactDetails", JSON.stringify(contactDetails));

  //     // Create order on backend
  //     const orderResponse = await axios.post("http://localhost:3000/api/orders", {}, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const { order, razorpayOrder } = orderResponse.data;

  //     // Open Razorpay payment modal
  //     const options = {
  //       key: "rzp_test_YdGeAGIdZWPXpJ", // Replace with actual key
  //       amount: razorpayOrder.amount,
  //       currency: "INR",
  //       name: "Samvriksha",
  //       description: "Order Payment",
  //       order_id: razorpayOrder.id,
  //       handler: async function (response) {
  //         try {
  //           // Verify payment on backend
  //           const verifyResponse = await axios.post("http://localhost:3000/api/orders/verify-payment", {
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_signature: response.razorpay_signature,
  //           }, {
  //             headers: { Authorization: `Bearer ${token}` },
  //           });

  //           onOrderCreated(verifyResponse.data);
  //           setCart([]);
  //           localStorage.removeItem("cart");
  //           navigate("/orders");
  //           onClose();
  //         } catch (error) {
  //           console.error("Payment verification failed", error);
  //         }
  //       },
  //       prefill: {
  //         contact: user?.contactNo,
  //       },
  //       theme: { color: "#3399cc" },
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();
  //   } catch (error) {
  //     console.error("Error initiating payment", error);
  //   }
  // };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
  
      // Create order on backend
      const orderResponse = await axios.post("http://localhost:3000/api/orders", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const { order, razorpayOrder } = orderResponse.data;
  
      const options = {
        key: "rzp_test_YdGeAGIdZWPXpJ",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Samvriksha",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // Payment verification
            const verifyResponse = await axios.post(
              "http://localhost:3000/api/orders/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
  
            onOrderCreated(verifyResponse.data);
            setCart([]);
            localStorage.removeItem("cart");
            onClose();
          } catch (error) {
            console.error("Payment verification failed", error);
          }
        },modal: {
          escape: false,
          ondismiss: function () {
            // alert("Payment modal closed. Cancelling order...");
            console.log("Payment modal closed by user.");
      
            axios.post(
              "http://localhost:3000/api/orders/cancel",
              { razorpay_order_id: razorpayOrder.id },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => console.log("Order cancelled successfully."))
            .catch((err) => console.error("Error cancelling order:", err));
          },
        },
        prefill: {
          contact: user?.contactNo,
          name: user?.firstName,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
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
            <label className={styles.checkoutModalLabel}>Name</label>
            <input
              className={styles.checkoutModalInput}
              type="text"
              value={user?.firstName}
              onChange={(e) => setContactDetails({ ...contactDetails, contactNo: e.target.value })}
              readOnly
            />
          </div>
          <div>
            <label className={styles.checkoutModalLabel}>Contact Number</label>
            <input
              className={styles.checkoutModalInput}
              type="text"
              value={user?.contactNo}
              onChange={(e) => setContactDetails({ ...contactDetails, contactNo: e.target.value })}
              readOnly
            />
          </div>
          <div>
            <label className={styles.checkoutModalLabel}>Address</label>
            <textarea
              className={styles.checkoutModalTextarea}
              value={user?.address}
              onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
              readOnly
            />
          </div>
          <div>
            <label className={styles.checkoutModalLabel}>Pincode</label>
            <input
              className={styles.checkoutModalInput}
              type="text"
              value={user?.pincode}
              onChange={(e) => setContactDetails({ ...contactDetails, pincode: e.target.value })}
              readOnly
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



// import React, { useState, useEffect } from "react";
// import { useCart } from "../../src/CartContext";
// import { useAuth } from "../../src/AuthContext";
// import axios from "axios";
// import styles from "./CheckoutModal.module.css";

// const CheckoutModal = ({ isOpen, onClose, onOrderCreated }) => {
//   const { cart, setCart } = useCart();
//   const { user } = useAuth();
//   const [contactDetails, setContactDetails] = useState({
//     contactNo: "",
//     address: "",
//     pincode: "",
//   });
//   const [shippingCost, setShippingCost] = useState(0);

//   useEffect(() => {
//     const savedDetails = JSON.parse(localStorage.getItem("contactDetails"));
//     if (savedDetails) {
//       setContactDetails(savedDetails);
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch shipping charge from backend when pincode changes
//   useEffect(() => {
//     const fetchShippingCost = async () => {
//       try {
//         if (!contactDetails.pincode) return;

//         const token = localStorage.getItem("token");
//         if (!token) return;

//         // Calculate total weight (default to 1kg if weight is not provided)
//         const totalWeight = cart.reduce((acc, item) => acc + (item.product.weight || 1), 0);

//         const response = await axios.post(
//           "http://localhost:3000/api/shipping",
//           { pincode: contactDetails.pincode, weight: totalWeight },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setShippingCost(response.data.shippingAmount);
//       } catch (error) {
//         console.error("Error fetching shipping cost:", error);
//       }
//     };

//     if (isOpen && cart.length > 0) fetchShippingCost();
//   }, [isOpen, cart, contactDetails.pincode]);

//   const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//   const finalAmount = totalAmount + shippingCost;

//   const handlePayment = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       // Save contact details to local storage
//       localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
  
  
//       // Create order on backend with shipping cost included
//       const orderResponse = await axios.post(
//         "http://localhost:3000/api/orders",
//         { shippingAmount: shippingCost  },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       const { order, razorpayOrder } = orderResponse.data;
  
//       // Open Razorpay payment modal
//       const options = {
//         key: "rzp_test_YdGeAGIdZWPXpJ", // Replace with actual key
//         amount: razorpayOrder.amount,
//         currency: "INR",
//         name: "Samvriksha",
//         description: "Order Payment",
//         order_id: razorpayOrder.id,
//         handler: async function (response) {
//           try {
//             // Verify payment on backend
//             const verifyResponse = await axios.post(
//               "http://localhost:3000/api/orders/verify-payment",
//               {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
  
//             onOrderCreated(verifyResponse.data);
//             setCart([]);
//             localStorage.removeItem("cart");
//             onClose();
//           } catch (error) {
//             console.error("Payment verification failed", error);
//           }
//         },
//         prefill: {
//           contact: contactDetails.contactNo,
//         },
//         theme: { color: "#3399cc" },
//       };
  
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error("Error initiating payment", error);
//     }
//   };
  

//   if (!isOpen) return null;

//   return (
//     <div className={styles.checkoutModal}>
//       <div className={styles.checkoutModalContent}>
//         <h2 className={styles.checkoutModalHeader}>Confirm Your Details</h2>
//         <form className={styles.checkoutModalForm}>
//         <div>
//              <label className={styles.checkoutModalLabel}>Contact Number</label>
//              <input
//               className={styles.checkoutModalInput}
//               type="text"
//               value={contactDetails.contactNo}
//               onChange={(e) => setContactDetails({ ...contactDetails, contactNo: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className={styles.checkoutModalLabel}>Address</label>
//             <textarea
//               className={styles.checkoutModalTextarea}
//               value={contactDetails.address}
//               onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className={styles.checkoutModalLabel}>Pincode</label>
//             <input
//               className={styles.checkoutModalInput}
//               type="text"
//               value={contactDetails.pincode}
//               onChange={(e) => setContactDetails({ ...contactDetails, pincode: e.target.value })}
//             />
//           </div>
//           <div className={styles.modalPrice}>Product Amount: ₹{totalAmount}</div>
//           <div className={styles.modalPrice}>Shipping Charge: ₹{shippingCost}</div>
//           <div className={styles.modalPrice}><strong>Total Payable: ₹{finalAmount}</strong></div>
//           <div className={styles.checkoutModalFooter}>
//             <button type="button" className={styles.checkoutModalButton} onClick={handlePayment}>
//               Proceed to Payment
//             </button>
//             <button type="button" className={styles.checkoutModalCancelButton} onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutModal;





