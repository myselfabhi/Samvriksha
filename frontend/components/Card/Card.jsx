import React, { useState } from 'react'
import styles from './Card.module.css'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({name,img,desc,price,slug,colors}) => {
// const Card = ({id,name,price,description,slug,img,category,type}) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(colors.length>0 ? colors[0] : null);


    const handleAddToCart = () => {
        if (!localStorage.getItem("token")) {
          navigate("/login");
        } else {
          addToCart(product, selectedColor, 1); // Pass quantity along with color
        }
      };
    

  return (
      <div className={styles.cardBox}>
          <div className={styles.cardImage}>
          <Link style={{display:'flex', justifyContent:'center', alignItems:'center'}} to={`/productInfo/${slug}`} >
           <img src={img} alt={name} className={styles.cardImg}/>
          </Link>          
          </div>
          <div className={styles.cardDetails}>
          <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{name}</h2>
              <p className={styles.cardText}>{desc.length > 120 ? desc.slice(0, 120) + "..." : desc}</p>
          </div>
          <div className={styles.cardButtonBox}>
              {/* {price != 0 ? <h4 className={styles.cardPrice}>₹{price}</h4> : ''} */}
              {<button onClick={()=> navigate(`/productInfo/${slug}`)} className={styles.cardButton}>View Product</button>}
          </div>
          </div>
      </div>
    )
}

export default Card