import { useState } from "react";
import { useAuth } from "../../src/AuthContext";
import styles from "./Login.module.css"; // ✅ Import CSS module
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
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
      setTimeout(() => navigate("/"), 100); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}> {/* ✅ Changed class to match register page */}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
