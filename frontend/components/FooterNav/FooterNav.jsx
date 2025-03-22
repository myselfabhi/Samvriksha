import React from 'react'
import styles from './FooterNav.module.css'
import { Link, useNavigate } from 'react-router-dom'


const FooterNav = () => {
    const navigate = useNavigate()
    return (
      <div className={styles.navbar}>
          <ul>
              {/* <li onClick={() => navigate('/')}>About Us</li> */}
              {/* <li onClick={() => navigate('/')}>Contact Us</li> */}
              {/* <li><span>Sustainable Farming</span> </li>
              <li><span>Sustainable Decor</span></li>
              <li><span>Sustainable Gifting</span></li>
              <li><span>Nature-Based Solutions</span></li> */}<Link style={{textDecoration:'none'}} to={`/products/${'farming'}`}><li><span>Sustainable Farming</span></li></Link>
            <Link style={{textDecoration:'none'}} to={`/products/${'decor'}`}><li><span>Sustainable Decor & Gifting</span></li></Link>
            {/* <Link style={{textDecoration:'none'}} to={`/products/${'gift'}`}><li><span>Sustainable Gifting</span></li></Link> */}
            <Link style={{textDecoration:'none'}} to={`/products/${'nbs'}`}><li><span>Nature-Based Solutions</span></li></Link>
            <Link style={{textDecoration:'none'}} to="/contact"><li><span>Contact Us</span></li></Link>
            <Link style={{textDecoration:'none'}} to="/terms-and-conditions"><li><span>Terms & Policies</span></li></Link>
          </ul>
      </div>
    )
}

export default FooterNav