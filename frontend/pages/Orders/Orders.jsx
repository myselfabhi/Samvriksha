// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Orders.module.css";
// import { useAuth } from "../../src/AuthContext";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();

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

//     if(localStorage.getItem("token")){
//         fetchOrders();
//     }else{
//         // setError("Please login to view orders");
//         setLoading(false);
//         navigate("/login");
//     }
//   }, []);

//   if (loading) return <p className={styles.loading}>Loading orders...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (orders.length === 0) return <p className={styles.noOrders}>No orders found</p>;

//   return (
//     <div className={styles.ordersContainer}>
//       <h2 className={styles.title}>Your Orders</h2>
//       {orders.map((order) => (
//         <div key={order._id} className={styles.orderCard}>
//           <p className={styles.orderId}>Order ID: <span style={{fontFamily:'"Poppins", sans-serif'}}>{order._id}</span></p>
//           <p className={styles.totalAmount}>Total: <span style={{fontFamily:'"Poppins", sans-serif'}}>₹{order.totalAmount}</span></p>
//           <p className={styles.status}>Status: {order.status}</p>
//           <p className={styles.paymentStatus}>Payment: {order.paymentStatus}</p>
//           <p className={styles.orderDate}>Ordered on: <span style={{fontFamily:'"Poppins", sans-serif'}}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
//           <div className={styles.productList}>
//             {order.products.map((item, index) => (
//               <div key={index} className={styles.productItem}>
//                 <img src={item.product.img[0]} alt="Product" className={styles.productImage} />
//                 <div className={styles.productDetails}>
//                 <p>Product: <span>{item.product.name}</span></p>
//                 <p>Quantity: <span style={{fontFamily:'"Poppins", sans-serif'}}>{item.quantity}</span></p>
//                 <p>Color: {item.selectedColor || "N/A"}</p>
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


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";
import { useAuth } from "../../src/AuthContext";
import Loader from "../../components/Loader/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(orders)

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

    if (localStorage.getItem("token")) {
      fetchOrders();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, []);

  if (loading) return <p className={styles.loading}><Loader/></p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (orders.length === 0) return <p className={styles.noOrders}>No orders found</p>;

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <p className={styles.orderId}>
            Order ID: <span style={{ fontFamily: '"Poppins", sans-serif' }}>{order._id}</span>
          </p>
          <p className={styles.totalAmount}>
            Total: <span style={{ fontFamily: '"Poppins", sans-serif' }}>₹{order.totalAmount}</span>
          </p>
          {/* <p className={styles.status}>Status: {order.status}</p> */}
          <p className={styles.paymentStatus}>Payment: {order.paymentStatus}</p>
          <p className={styles.orderDate}>
            Ordered on: <span style={{ fontFamily: '"Poppins", sans-serif' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
          </p>
          <div className={styles.productList}>
            {order.products.map((item, index) => (
              <div key={index} className={styles.productItem}>
                <img
                  src={item.product.img[0]} // Use the populated product image
                  alt="Product"
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <p>
                    Product: <span>{item.productName}</span> {/* Use productName from the order */}
                  </p>
                  <p>
                    Quantity: <span style={{ fontFamily: '"Poppins", sans-serif' }}>{item.quantity}</span>
                  </p>
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
                          <li key={idx}>
                            {option.name} (+₹{option.price})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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



