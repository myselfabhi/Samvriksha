import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in (when app loads)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://samvrikshatest.onrender.com/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          if (err.response?.status === 401) {
            localStorage.removeItem("token"); // Remove token only if it's invalid
          }
        });
    }
    setTimeout(() => setLoading(false), 500);;
  }, []);
  

  // Login function
  const login = async (email, password) => {
    const res = await axios.post("https://samvrikshatest.onrender.com/api/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
