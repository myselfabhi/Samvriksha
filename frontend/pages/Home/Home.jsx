import React, { useEffect } from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { FaWind } from "react-icons/fa";
import { TbMoodSpark } from "react-icons/tb";
import { RiFlowerFill } from "react-icons/ri";
import { products } from '../../src/products';

import Testimonial from '../../components/Testimonial/Testimonial';
import FooterNav from '../../components/FooterNav/FooterNav';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../src/AuthContext';
import { useCart } from '../../src/CartContext';





const Home = () => {
  const {user} = useAuth()
  const {fetchCart, cart} =  useCart()

  
  return (
    <div style={{minHeight:'100vh'}} className={styles.homeContainer}>
        <div className={styles.heroBox}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover Your Perfect <span className={styles.heroTitleSpan}>Plant for Every</span> Occasion</h1>
            <p className={styles.heroText}>Welcome to your ultimate plant destination! Explore our diverse collection of plants tailored for gifting, home decor, and indoor living, including low-light varieties that thrive without sunlight.</p>
            <button className={styles.heroButton}>Shop Now</button>
          </div>
        </div>
        <div className={styles.discoverBox}>
          <h2 className={styles.discoverTitle}>EXPLORE</h2> 
          <div className={styles.cardContainer}>
            <Card img={products[0].img[0]} name={products[0].name} desc={products[0].description} price={products[0].price} slug={products[0].slug} colors={products[0].colors}/>
            <Card img={products[1].img[0]} name={products[1].name} desc={products[1].description} price={products[1].price} slug={products[1].slug} colors={products[1].colors}/>
            <Card img={products[2].img[0]} name={products[2].name} desc={products[2].description} price={products[2].price} slug={products[2].slug} colors={products[2].colors}/>
            <Card img={products[3].img[0]} name={products[3].name} desc={products[3].description} price={products[3].price} slug={products[3].slug} colors={products[3].colors}/>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoContent}>
            <div className={styles.topInfo}>
            <h2 className={styles.infoTitle}>Find Out the Transformative Power of Plants</h2>
            <p className={styles.infoText}>Plants are not just beautiful additions to your space; they offer numerous benefits that enhance your life. From purifying the air to boosting your mood, incorporating plants into your environment can lead to a healthier, happier you.</p>
            </div>
            <div className={styles.bottomInfo}>
              <div className={styles.addInfo}>
                <h3 className={styles.addInfoTitle}><FaWind size={40} color='green'/> <span>Air Purification</span></h3>
                <p className={styles.addInfoText}>Plants are natural air purifiers, removing toxins and impurities from the air to create a healthier indoor environment.</p>                
              </div>
              <div className={styles.addInfo}>
                <h3 className={styles.addInfoTitle}><RiFlowerFill size={40} color='green'/> <span>Aesthetic Appeal</span></h3>
                <p className={styles.addInfoText}>Enhance your decor with vibrant greenery that adds life and beauty to any room.</p>
              </div>
              <div className={styles.addInfo}>
                <h3 className={styles.addInfoTitle}><TbMoodSpark size={40} color='green'/> <span>Mood Enhancement</span></h3>
                <p className={styles.addInfoText}>Plants have been shown to boost mood and increase productivity, making them a valuable addition to any space.</p>
            </div>

          </div>
        </div>
        <div className={styles.infoImage}>
          <img src='./infoImg.jpg' alt='infoImage' />

        </div>
    </div>
    <div className={styles.testimonialBox}>
    <Testimonial />
    </div>
    <div className={styles.footerBox}>
      <Footer />
    </div>
    
    </div>
  )
}

export default Home