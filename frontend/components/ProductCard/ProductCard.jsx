import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'

const ProductCard = ({id,name,price,description,slug,img}) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.card}>
            <Link to={`${slug}`}>
            <img src={img} alt={name} className={styles.cardImg}/>
            </Link>
            <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{name}</h3>
            {/* <p className={styles.cardText}>{description}</p> */}
            <div className={styles.addCard}>
            <h4 className={styles.cardPrice}>₹{price}</h4>
            <button className={styles.cardButton}>Buy Now</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard