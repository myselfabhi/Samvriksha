import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactBox}>
        {/* Left Side - Contact Details */}
        <div className={styles.left}>
          <h1 className={styles.heading}>Contact Us</h1>
          <p className={styles.info}><strong>Email:</strong> <a style={{fontFamily: 'Inter, sans-serif'}} href="mailto:samvriksha@gmail.com">samvriksha@gmail.com</a></p>
          <p className={styles.info}><strong>Phone:</strong> +91-8130322828</p>
        </div>

        {/* Right Side - QR Code for Chat */}
        <div className={styles.right}>
          <h2 className={styles.qrHeading}>Scan to Chat</h2>
          <img src={'/whatsapp_qr.png'} alt="Chat QR Code" className={styles.qrImage} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
