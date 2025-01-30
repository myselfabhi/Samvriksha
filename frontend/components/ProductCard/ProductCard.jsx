import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../src/CartContext'

const ProductCard = ({product}) => {
// const ProductCard = ({id,name,price,description,slug,img,category,type}) => {
    const navigate = useNavigate()
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors.length>0 ? product.colors[0] : null);

    

  return (
      <div className={styles.cardBox}>
          <div className={styles.cardImage}>
          <Link style={{display:'flex', justifyContent:'center', alignItems:'center'}} to={`/productInfo/${product.slug}`} >
           <img src={product.img[0]} alt={product.name} className={styles.cardImg}/>
          </Link>          
          </div>
          <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{product.name}</h2>
              {/* <p className={styles.cardText}>{content}</p> */}
          </div>
          <div className={styles.cardButtonBox}>
              {product.price != 0 ? <h4 className={styles.cardPrice}>₹{product.price}</h4> : ''}
              {product.price != 0 ? <button onClick={() => addToCart(product, quantity, selectedColor)} className={styles.cardButton}>Add To Cart</button> : <button className={styles.cardButton}>Coming Soon</button>}
          </div>
      </div>
    )
}

export default ProductCard