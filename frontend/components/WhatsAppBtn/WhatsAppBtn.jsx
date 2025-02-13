import { useState } from "react";
import styles from "./WhatsAppBtn.module.css";
import { FaWhatsapp } from "react-icons/fa";


export default function WhatsAppBtn() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className={styles.whatsappContainer}>
      {showQR && (
        <div className={styles.qrContainer}>
          <img src={'whatsapp_qr.png'} alt="WhatsApp QR Code" className={styles.qrImage} />
          <p>Chat with us!</p>
          <button className={styles.closeButton} onClick={() => setShowQR(false)}>✖</button>
        </div>
      )}
      <button className={styles.whatsappButton} onClick={() => setShowQR(!showQR)}>
        {/* <img src="/whatsapp-icon.png" alt="WhatsApp" className={styles.icon} /> */}
        <FaWhatsapp size={30}/>
      </button>
      {/* <span>Chat with us!</span> */}
    </div>
  );
}
