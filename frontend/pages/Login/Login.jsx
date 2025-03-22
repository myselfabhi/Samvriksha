import { useState } from "react";
import { useAuth } from "../../src/AuthContext";
import styles from "./Login.module.css"; // ✅ Import CSS module
import { useNavigate } from "react-router-dom";
import { useCart } from "../../src/CartContext";
import Loader from "../../components/Loader/Loader";
const Login = () => {
  const { login } = useAuth();
  const {fetchCart} = useCart()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    //   alert("Login successful!");
      fetchCart()
      setTimeout(() => navigate("/"), 100); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.formWrapper}>
        <h2 className={styles.header}>Login</h2>
        {error && <p className={styles.message}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
        <div className={styles.formFooter}>
          Don't have an account? <a href="/register">Register</a>
          <br />
          <a href="/terms-and-conditions">Terms & Policies</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
