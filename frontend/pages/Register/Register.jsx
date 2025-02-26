import { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css"; 
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNo: "",
    address: "",
    pincode: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.formWrapper}>
        <h2 className={styles.header}>Register</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputField}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="text"
            name="contactNo"
            placeholder="Contact No"
            onChange={handleChange}
            maxLength={10}
            required
          />
          <input
            className={styles.inputField}
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            maxLength={6}
            required
          />
          <button className={styles.submitButton} type="submit">
            Register
          </button>
        </form>
        <div className={styles.formFooter}>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
