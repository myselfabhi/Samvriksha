import React from "react";
import styles from "./TermsAndConditions.module.css"

const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <p className={styles.lastUpdated}>Last Updated: March 18, 2025</p>
      <br />
      <p className={styles.disclaimer}>
      Welcome to SAMVRIKSHA! By accessing our website and purchasing our products, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
      </p>

      <h2 className={styles.subHeading}>1. General Information</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>
        SAMVRIKSHA is an e-commerce platform offering sustainable products in three categories:
      </p>
      <ul className={styles.list}>
        <li>Sustainable Agriculture – Patented products for farming, vertical farming, hydroponics, and aeroponics.</li>
        <li>Sustainable Décor – Home and office décor using real preserved moss and plants with no plastic involved.</li>
        <li>DIY Category – Materials and equipment for creating sustainable décor, including preserved moss, plants, and décor idols.</li>
      </ul>
      <br />
      <p style={{fontFamily: 'Inter, sans-serif'}}>By accessing and using our website (<a href="https://samvriksha.netlify.app" style={{textDecoration:'none', color:'green'}}>Samviksha</a>), you agree to abide by the terms stated below.</p>

      <h2 className={styles.subHeading}>2. Product Information and Availability</h2>
       <ul className={styles.list}>
      <li>We strive to provide accurate product descriptions and images. However, variations in color, size, or texture may occur due to the nature of preserved and organic materials as well as because of their handmade nature.</li>
      <li>Product availability is subject to change without prior notice.</li>
      </ul>       

      <h2 className={styles.subHeading}>3. Pricing and Payment</h2>
      <ul className={styles.list}>
        <li>All prices listed on our Website are in Indian National Rupee and are subject to change without notice.</li>
        <li>We accept various payment methods, including credit/debit cards, net banking, UPI, and other payment gateways.</li>
        <li>In case of payment failure, please check with your bank or payment service provider.</li>
      </ul>

      <h2 className={styles.subHeading}>4. Shipping and Delivery</h2>
      <ul className={styles.list}>
        <li>We offer shipping across India. Estimated delivery times vary based on location and product availability.</li>
        <li>Shipping charges will be calculated at checkout</li>
        <li>Delays in delivery due to unforeseen circumstances (e.g., natural disasters, strikes) are beyond our control.</li>
      </ul>

      <h2 className={styles.subHeading}>5. Returns and Refunds</h2>
      <ul className={styles.list}>
        <li>Returns: We accept returns only for defective or damaged products. The request must be raised within 3 days of delivery.</li>
        <li>Refunds: Approved refunds will be processed to the original payment method within 7 business days.</li>
      </ul>

      <h2 className={styles.subHeading}>6. Intellectual Property</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>All content on this Website, including text, images, logos, and designs, is the intellectual property of SAMVRIKSHA. Unauthorized use, reproduction, or distribution of any content is prohibited.</p>
      
      
      <h2 className={styles.subHeading}>7. Limitation of Liability</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>SAMVRIKSHA is not liable for any indirect, incidental, or consequential damages arising from the use of our products or Website.</p>

      <h2 className={styles.subHeading}>8. Privacy Policy</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>
      Your personal information is protected as per Indian laws. We do not share customer details with third parties without consent.
      </p>
      
      <h2 className={styles.subHeading}>9. Governing Law and Dispute Resolution</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>
      These terms shall be governed by the laws of India. Any disputes shall be resolved through arbitration or courts in India.      
      </p>

      <h2 className={styles.subHeading}>10. Changes to Terms and Conditions</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>
      We reserve the right to update these terms at any time. Continued use of our Website signifies acceptance of the updated terms.
      <br />
      For any queries, contact us at samvriksha@gmail.com.
      </p>

      <h2 className={styles.subHeading}>11. Contact Us</h2>
      <p style={{fontFamily: 'Inter, sans-serif'}}>
        📧 Email: <a href="mailto:samvriksha@gmail.com" className={styles.link}>samvriksha@gmail.com</a>    
        <br />
        📞 Phone: +91-9876543210  
      </p>
    </div>
  );
};

export default TermsAndConditions;
