import React from 'react'
import styles from './Card.module.css'

const Card = ({img,title,content}) => {
  return (
    <div className={styles.cardBox}>
        <div className={styles.cardImage}>
            <img src={img} alt='cardImage' />
        </div>
        <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardText}>{content}</p>
        </div>
        <div className={styles.cardButtonBox}>
            <button className={styles.cardButton}>Shop Now</button>
        </div>
    </div>
  )
}

export default Card