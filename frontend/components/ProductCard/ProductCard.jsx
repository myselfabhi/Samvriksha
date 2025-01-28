import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'

const ProductCard = ({id,name,price,description,slug,img,category,type}) => {
  // return (
  //   <div className={styles.cardContainer}>
  //       <div className={styles.card}>
  //           <Link to={`${slug}`}>
  //           <img src={img} alt={name} className={styles.cardImg}/>
  //           </Link>
  //           <div className={styles.cardContent}>
  //           <h3 className={styles.cardTitle}>{name}</h3>
  //           {/* <p className={styles.cardText}>{description}</p> */}
  //           <div className={styles.addCard}>
  //           <h4 className={styles.cardPrice}>₹{price}</h4>
  //           <button className={styles.cardButton}>Buy Now</button>
  //           </div>
  //           </div>
  //       </div>
  //   </div>
  // )
  return (
      <div className={styles.cardBox}>
          <div className={styles.cardImage}>
          <Link style={{display:'flex', justifyContent:'center', alignItems:'center'}} to={`${slug}`}>
           <img src={img} alt={name} className={styles.cardImg}/>
          </Link>          
          </div>
          <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{name}</h2>
              {/* <p className={styles.cardText}>{content}</p> */}
          </div>
          <div className={styles.cardButtonBox}>
              {price != 0 ? <h4 className={styles.cardPrice}>₹{price}</h4> : ''}
              {price != 0 ? <button className={styles.cardButton}>Buy Now</button> : <button className={styles.cardButton}>Coming Soon</button>}
          </div>
      </div>
    )
}

export default ProductCard