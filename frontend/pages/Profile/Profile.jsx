import React, { useContext, useState } from "react";
import { useAuth } from "../../src/AuthContext";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
  });

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
              value={userDetails.firstName}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Last Name</label>
            <input
              className={styles.profileInput}
              type="text"
              value={userDetails.lastName}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Email</label>
            <input
              className={styles.profileInput}
              type="email"
              value={userDetails.email}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Contact Number</label>
            <input
              className={styles.profileInput}
              type="text"
              value={userDetails.contactNo}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Address</label>
            <textarea
              className={styles.profileTextarea}
              value={userDetails.address}
              readOnly
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Pincode</label>
            <input
              className={styles.profileInput}
              type="text"
              value={userDetails.pincode}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
