import React from 'react'
import styles from './Footer.module.css'
import FooterNav from '../FooterNav/FooterNav'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerBox}>
      <div className={styles.footerTop}>
      <div className={styles.companyContent}>
      <div className={styles.footerLogo}>
        <img src='./logo.PNG' alt='logo' className={styles.blendedLogo} />
      </div>
        {/* <div className={styles.companyAddress}>
          <h3>Address: </h3>
          <p>1234 Green Street, Delhi, India</p>
        </div> */}
        <div className={styles.companyContact}>
          <h3>Contact Us: </h3>
          <p style={{fontFamily: 'Inter, sans-serif'}}>Phone: +91-8130322828</p>
          <p style={{fontFamily: 'Inter, sans-serif'}}>Email: samvriksha@gmail.com</p>
        </div>
        <div className={styles.footerSocials}>
          <h3>Follow Us:</h3>
          <div className={styles.socialIcons}>
          {/* <div>
            <FaFacebookSquare />
          </div> */}
          <div>
           <a style={{color:'white'}} href='https://www.instagram.com/samvriksha_sustainability?igsh=MTJ4bW9yZHVrZnlweg=='><FaInstagram /></a>
          </div>
          {/* <div>
            <FaXTwitter />
          </div> */}
          </div>
          </div>
      </div>
        <div className={styles.footerNav}>
          <FooterNav />
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p style={{fontFamily: 'Inter, sans-serif'}}>&copy; {new Date().getFullYear()} Samvriksha. All rights reserved.</p>
      </div>
        
          

    </div>
  )
}

export default Footer