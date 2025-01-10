import React from 'react'
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.navbar}>
        <ul>
            <li onClick={()=> navigate('/')}>Home</li>
            <li onClick={()=> navigate('/products')}>Products</li>
        </ul>
    </div>
  )
}

export default Navbar