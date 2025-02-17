import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/AuthContext";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    contactNo: user?.contactNo || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    if (!token) navigate("/login");
  
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        contactNo: user.contactNo || "",
        address: user.address || "",
        pincode: user.pincode || "",
      });
    }
  }, [token, navigate, user]);
  

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put("https://samvrikshatest.onrender.com/update-profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        // setUser(res.data.user);
        window.location.reload()
        setEditMode(false);
      }
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  const changePassword = async () => {
    try {
      const res = await axios.put("https://samvrikshatest.onrender.com/change-password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success){
        alert("Password changed successfully");
        window.location.reload()
      } 
    } catch (error) {
      console.error("Password change failed", error);
    }
  };

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
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Last Name</label>
            <input
              className={styles.profileInput}
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Email</label>
            <input className={styles.profileInput} type="email" value={user?.email} readOnly />
          </div>
          <div>
            <label className={styles.profileLabel}>Contact Number</label>
            <input
              className={styles.profileInput}
              type="text"
              name="contactNo"
              value={profileData.contactNo}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Address</label>
            <textarea
              className={styles.profileTextarea}
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label className={styles.profileLabel}>Pincode</label>
            <input
              className={styles.profileInput}
              type="text"
              name="pincode"
              value={profileData.pincode}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
        </form>
        <div className={styles.buttonGroup}>
          <button onClick={() => setEditMode(!editMode)} className={styles.editButton}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          {editMode && (
            <button onClick={updateProfile} className={styles.saveButton}>Save</button>
          )}
        </div>
        <h3 className={styles.passwordHeader}>Change Password</h3>
        <div className={styles.passwordInfo}>

        <input
          className={styles.passwordInput}
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          />
        <input
          className={styles.passwordInput}
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          />
          </div>
        <button onClick={changePassword} className={styles.changePasswordButton}>Change Password</button>
      </div>
    </div>
  );
};

export default Profile;

