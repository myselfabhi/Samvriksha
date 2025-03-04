// import React, { useState } from 'react'
// import styles from './ProductCard.module.css'
// import { Link, useNavigate } from 'react-router-dom'
// import { useCart } from '../../src/CartContext'

// const ProductCard = ({product}) => {
// // const ProductCard = ({id,name,price,description,slug,img,category,type}) => {
//     const navigate = useNavigate()
//     const { addToCart } = useCart();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedColor, setSelectedColor] = useState(product.colors.length>0 ? product.colors[0] : null);


//     const handleAddToCart = () => {
//         if (!localStorage.getItem("token")) {
//           navigate("/login");
//         } else {
//           addToCart(product, selectedColor, 1); // Pass quantity along with color
//         }
//       };
    

//   return (
//       <div className={styles.cardBox}>
//           <div className={styles.cardImage}>
//           <Link style={{display:'flex', justifyContent:'center', alignItems:'center'}} to={`/productInfo/${product.slug}`} >
//            <img src={product.img[0]} alt={product.name} className={styles.cardImg}/>
//           </Link>          
//           </div>
//           <div className={styles.cardDetails}>
//           <div className={styles.cardContent}>
//               <h2 className={styles.cardTitle}>{product.name}</h2>
//               {/* <p className={styles.cardText}>{content}</p> */}
//           </div>
//           <div className={styles.cardButtonBox}>
//               {product.price != 0 ? <h4 className={styles.cardPrice}>₹{product.price}</h4> : ''}
//               {product.price != 0 ? <button onClick={handleAddToCart} className={styles.cardButton}>Add To Cart</button> : <button className={styles.cardButton}>Coming Soon</button>}
//           </div>
//           </div>
//       </div>
//     )
// }

// export default ProductCard


import React from 'react';
import styles from './ProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../src/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Calculate the minimum price from all variants and sizes
  const minPrice = product.variants.reduce((min, variant) => {
    const variantMin = variant.sizes.reduce((minSize, size) => {
      return size.price < minSize ? size.price : minSize;
    }, Infinity);
    return variantMin < min ? variantMin : min;
  }, Infinity);

  const handleAddToCart = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      // Navigate to the product info page to select variants, sizes, etc.
      navigate(`/productInfo/${product.slug}`);
    }
  };

  return (
    <div className={styles.cardBox}>
      <div className={styles.cardImage}>
        <Link
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          to={minPrice !== 0 && `/productInfo/${product.slug}`}
        >
          <img src={product.img[0]} alt={product.name} className={styles.cardImg} />
        </Link>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{product.name}</h2>
        </div>
        <div className={styles.cardButtonBox}>
          {minPrice !== Infinity && minPrice !== 0 ? (
            <h4 className={styles.cardPrice}>₹{minPrice}</h4>
          ) : (
            ''
          )}
          {minPrice !== 0 ? <button onClick={handleAddToCart} className={styles.cardButton}>
            Buy Now
          </button> : <button className={styles.cardButton}>Coming Soon</button>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;