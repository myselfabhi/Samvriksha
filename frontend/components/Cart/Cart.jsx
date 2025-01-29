import React from 'react'
import styles from './Cart.module.css'

const Cart = () => {
  return (
    <div className={styles.cartContainer}>
        <div className={styles.productImage}>
            <img src='./kalpTaruIndoor.PNG' width={200} height={200} />
        </div>
        <div className={styles.productDetails}>
            <div className={styles.productName}>KalpTaru Indoor Wish Tree</div>
            <div className={styles.productPrice}>₹ 5000</div>
            <div className={styles.productQuantity}>
                <button>-</button>
                <span>1</span>
                <button>+</button>
            </div>
            <div className={styles.productTotal}>₹ 5000</div>
            <div className={styles.productRemove}>Remove</div>
        </div>
    </div>
  )
}

export default Cart