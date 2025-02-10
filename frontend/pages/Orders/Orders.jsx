import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";
import { useAuth } from "../../src/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if(localStorage.getItem("token")){
        fetchOrders();
    }else{
        // setError("Please login to view orders");
        setLoading(false);
        navigate("/login");
    }
  }, []);

  if (loading) return <p className={styles.loading}>Loading orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (orders.length === 0) return <p className={styles.noOrders}>No orders found</p>;

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <p className={styles.orderId}>Order ID: <span style={{fontFamily:'"Poppins", sans-serif'}}>{order._id}</span></p>
          <p className={styles.totalAmount}>Total: <span style={{fontFamily:'"Poppins", sans-serif'}}>₹{order.totalAmount}</span></p>
          <p className={styles.status}>Status: {order.status}</p>
          <p className={styles.paymentStatus}>Payment: {order.paymentStatus}</p>
          <p className={styles.orderDate}>Ordered on: <span style={{fontFamily:'"Poppins", sans-serif'}}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
          <div className={styles.productList}>
            {order.products.map((item, index) => (
              <div key={index} className={styles.productItem}>
                <img src={item.product.img[0]} alt="Product" className={styles.productImage} />
                <div className={styles.productDetails}>
                <p>Product: <span>{item.product.name}</span></p>
                <p>Quantity: <span style={{fontFamily:'"Poppins", sans-serif'}}>{item.quantity}</span></p>
                <p>Color: {item.selectedColor || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import styles from "./Orders.module.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/orders", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setOrders(response.data);
//       } catch (err) {
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p className={styles.loading}>Loading orders...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (orders.length === 0) return <p className={styles.noOrders}>No orders found</p>;

//   return (
//     <div className={styles.orderContainer}>
//       <h2 className={styles.title}>Your Orders</h2>
//       {orders.map((order) => (
//         <div key={order._id} className={styles.orderCard}>
//           <p className={styles.orderId}>
//             Order ID: <span className={styles.orderIdValue}>{order._id}</span>
//           </p>
//           <p className={styles.totalAmount}>
//             Total: <span className={styles.totalAmountValue}>₹{order.totalAmount}</span>
//           </p>
//           <p className={styles.status}>
//             Status: <span className={styles.statusValue}>{order.status}</span>
//           </p>
//           <p className={styles.paymentStatus}>
//             Payment: <span className={styles.paymentStatusValue}>{order.paymentStatus}</span>
//           </p>
//           <p className={styles.orderDate}>
//             Ordered on: <span className={styles.orderDateValue}>{new Date(order.createdAt).toLocaleDateString()}</span>
//           </p>
//           <div className={styles.productList}>
//             {order.products.map((item, index) => (
//               <div key={index} className={styles.productItem}>
//                 <img src={item.product.img[0]} alt="Product" className={styles.productImage} />
//                 <div className={styles.productDetails}>
//                   <p className={styles.productName}>
//                     Product: <span className={styles.productNameValue}>{item.product.name}</span>
//                   </p>
//                   <p className={styles.productQuantity}>
//                     Quantity: <span className={styles.productQuantityValue}>{item.quantity}</span>
//                   </p>
//                   <p className={styles.productColor}>
//                     Color: <span className={styles.productColorValue}>{item.selectedColor || "N/A"}</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;

