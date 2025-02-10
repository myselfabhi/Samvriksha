import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../src/AuthContext";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  } , [token]);  

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h2 className={styles.profileHeader}>Profile</h2>
        <form className={styles.profileForm}>
          <div>
            <label className={styles.profileLabel}>First Name</label>
            <input
              className={styles.profileInput}
              type="text"
              value={user?.firstName}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Last Name</label>
            <input
              className={styles.profileInput}
              type="text"
              value={user?.lastName}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Email</label>
            <input
              className={styles.profileInput}
              type="email"
              value={user?.email}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Contact Number</label>
            <input
              className={styles.profileInput}
              type="text"
              value={user?.contactNo}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Address</label>
            <textarea
              className={styles.profileTextarea}
              value={user?.address}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Pincode</label>
            <input
              className={styles.profileInput}
              type="text"
              value={user?.pincode}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
