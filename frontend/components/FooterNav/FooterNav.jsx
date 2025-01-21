import React from 'react'
import styles from './FooterNav.module.css'
import { useNavigate } from 'react-router-dom'


const FooterNav = () => {
    const navigate = useNavigate()
    return (
      <div className={styles.navbar}>
          <ul>
              <li onClick={() => navigate('/')}>About Us</li>
              <li onClick={() => navigate('/')}>Contact Us</li>
              <li><span>Sustainable Farming</span> </li>
              <li><span>Sustainable Decor</span></li>
              <li><span>Sustainable Gifting</span></li>
              <li><span>Nature-Based Solutions</span></li>
          </ul>
      </div>
    )
}

export default FooterNav