import React from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { FaWind } from "react-icons/fa";
import { TbMoodSpark } from "react-icons/tb";
import { RiFlowerFill } from "react-icons/ri";





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
        <div className={styles.discoverBox}>
          <h2 className={styles.discoverTitle}>EXPLORE</h2> 
          <div className={styles.cardContainer}>
            <Card img='https://imgs.search.brave.com/9GwYToucoWK4A7GMI-L3snQT7iZ5lxdBDVXWiXzMwVY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L2Zt/SkhITmd0SnpNdjd2/TGVWYTJRN24tMzIw/LTgwLmpwZw' title='Balcony Bageecha' content='Bring the outdoors inside with our indoor wish tree collection. These plants are perfect for adding a touch of green to your home or office.'/>
            <Card img='https://imgs.search.brave.com/0YuSboazURQU8N56W5Zn-pqTfbUrAiPZpOqtpLghLA0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmJhY2t5YXJk/Ym9zc2ltYWdlcy5j/b20vd29yZHByZXNz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzEyL3Bhd2VsLWN6/ZXJ3aW5za2ktQkFp/UmZidDFIUkUtdW5z/cGxhc2guanBn' title='Bookshelf' content='Bring the outdoors inside with our indoor wish tree collection. These plants are perfect for adding a touch of green to your home or office.'/>
            <Card img='https://imgs.search.brave.com/9CCkF_7cuuylcXGsDMaB-JD02LcwuUvhgjAn5YX_ir0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/YWxtLXRyZWUtaG91/c2UtcGxhbnQtcG90/XzUzODc2LTEyNTgz/Ny5qcGc_c2VtdD1h/aXNfaHlicmlk' title='Outdoor Wish Tree' content='Bring the outdoors inside with our indoor wish tree collection. These plants are perfect for adding a touch of green to your home or office.'/>
            <Card img='https://imgs.search.brave.com/WhlxjyzsXAo8yh5Tdo1SlI4lXw3lxXkKYyWn5vcu2WU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by96/ei1wbGFudC1ncmF5/LXBvdF81Mzg3Ni0x/MzQyODUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA' title='Indoor Wish Tree' content='Bring the outdoors inside with our indoor wish tree collection. These plants are perfect for adding a touch of green to your home or office.'/>
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
    </div>
  )
}

export default Home