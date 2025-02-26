import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {user} = useAuth()
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  // Fetch Cart from Backend
  const fetchCart = async () => {
    if (!token) return;
    try {
      const { data } = await axiosInstance.get("/cart");
  
      // Check if data is an array or object and handle accordingly
      if (Array.isArray(data)) {
        const formattedCart = data.map(item => ({
          _id: item._id,
          product: item.productId || {},
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor || "",
        }));
        setCart(formattedCart);
      } else if (data.items) {
        // Handle case where cart is an object containing 'items' array
        const formattedCart = data.items.map(item => ({
          _id: item._id,
          product: item.productId || {},
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor || "",
        }));
        setCart(formattedCart);
      } else {
        console.error("Unexpected cart structure:", data);
      }
    } 
    catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };

  // Add to Cart (Backend)
  const addToCart = async (product, selectedColor, quantity) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      // Pass the dynamic quantity instead of hardcoded 1
      await axiosInstance.post("/cart/add", { productId: product._id, selectedColor, quantity });
      fetchCart(); // Refresh the cart after adding the item
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };
  

  // Update Quantity
  const updateQuantity = async (productId, selectedColor, quantity) => {
    if (!token) {
      alert("Please log in to update your cart.");
      return;
    }
    try {
      await axiosInstance.put("/cart/update", { productId, selectedColor, quantity });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId, selectedColor) => {
    if (!token) {
      alert("Please log in to remove items from your cart.");
      return;
    }
    try {
      await axiosInstance.delete("/cart/remove", { data: { productId, selectedColor } });
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if(user){
      fetchCart();
    }
  }, [user]);// 

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

