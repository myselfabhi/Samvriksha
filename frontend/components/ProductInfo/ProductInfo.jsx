// import React, { useEffect, useState } from 'react';
// import styles from './ProductInfo.module.css';
// import { useLocation, useParams } from 'react-router-dom';
// import { products } from '../../src/products';
// import { useCart } from '../../src/CartContext';


// const ProductInfo = () => {
//   const {slug} = useParams()
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);



//   useEffect(() => {
//     // Find product by slug
//     const foundProduct = products.find((item) => item.slug === slug);
//     if (foundProduct) {
//       setProduct(foundProduct);
//       setSelectedColor(foundProduct.colors ? foundProduct.colors[0] : null);
//     }
//   }, [slug]);

//   if (!product) {
//     return <div className={styles.error}>Product not found</div>;
//   }

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product.img.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.img.length - 1 : prevIndex - 1
//     );
//   };

//    // Increase quantity
//    const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   // Decrease quantity (minimum 1)
//   const decreaseQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   return (
//     <div className={styles.productInfoContainer}>
//       <div className={styles.productImage}>
//         <button className={styles.prevButton} onClick={prevImage}>
//           &#10094;
//         </button>
//         <img
//           src={product.img[currentImageIndex]}
//           width={500}
//           height={500}
//           alt="Product"
//         />
//         <button className={styles.nextButton} onClick={nextImage}>
//           &#10095;
//         </button>
//       </div>
//       <div className={styles.productDetails}>
//         <div className={styles.productName}>{product.name}</div>
//         <div className={styles.productPrice}>₹ {product.price}</div>
//         <div className={styles.productOptions}>
//           {product.colors.length>0 ? (<div className={styles.productColor}>
//             <span>Colors:</span>
//             {product.colors.map((color) => (
//               <div
//                 key={color}
//                 style={{ backgroundColor: color, outline: selectedColor === color ? '3px solid black' : 'none', cursor: 'pointer' }}
//                 className={styles.colorOption}
//                 onClick={() => setSelectedColor(color)}
//               ></div>
//             ))}
//           </div>):null}
//           <div style={{display:'flex', flexDirection:'row',alignItems:'center',gap:'20px'}}>
//           <div className={styles.productQuantity}>
//             <button onClick={decreaseQuantity}>-</button>
//             <span style={{fontFamily:'Franklin Gothic Medium'}}>{quantity}</span>
//             <button onClick={increaseQuantity}>+</button>
//           </div>
//           <div className={styles.addCartButton}>
//             <button onClick={() => addToCart(product, quantity, selectedColor)}>Add To Cart</button>
//           </div>
//           </div>
//         </div>
//         <div className={styles.productDescription}>
//           {product.description}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;


import React, { useEffect, useState } from 'react';
import styles from './ProductInfo.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../src/CartContext';
import Loader from '../Loader/Loader';

const ProductInfo = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate()
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const response = await fetch(`http://localhost:3000/api/products/${slug}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedColor(data.colors?.length ? data.colors[0] : null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // if (!product) {
  //   return <div className={styles.error}>Product not found</div>;
  // }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.img.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.img.length - 1 : prevIndex - 1
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      addToCart(product, selectedColor, quantity); // Pass quantity along with color
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.productImage}>
        <button className={styles.prevButton} onClick={prevImage}>&#10094;</button>
        <img src={product.img[currentImageIndex]} width={500} height={500} alt="Product" />
        <button className={styles.nextButton} onClick={nextImage}>&#10095;</button>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productPrice}>₹ {product.price}</div>
        <div className={styles.productOptions}>
          {product.colors?.length > 0 && (
            <div className={styles.productColor}>
              <span>Colors:</span>
              {product.colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color, outline: selectedColor === color ? '3px solid black' : 'none', cursor: 'pointer' }}
                  className={styles.colorOption}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <div className={styles.productQuantity}>
              <button onClick={decreaseQuantity}>-</button>
              <span style={{ fontFamily: 'Franklin Gothic Medium' }}>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <div className={styles.addCartButton}>
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className={styles.productDescription}>{product.description}</div>
      </div>
    </div>
  );
};

export default ProductInfo;

