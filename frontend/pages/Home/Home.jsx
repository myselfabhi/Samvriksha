import React from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/Navbar/Navbar'


const Home = () => {
  return (
    <div style={{minHeight:'100vh'}} className={styles.homeContainer}>
        <div className={styles.heroBox}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover Your Perfect <span className={styles.heroTitleSpan}>Plant for Every</span> Occasion</h1>
            <p className={styles.heroText}>Welcome to your ultimate plant destination! Explore our diverse collection of plants tailored for gifting, home decor, and indoor living, including low-light varieties that thrive without sunlight.</p>
            <button className={styles.heroButton}>Shop Now</button>
          </div>
        </div>
    </div>
  )
}

export default Home