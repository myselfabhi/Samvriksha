import React, { useEffect, useState } from 'react';
import styles from './ProductInfo.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../../src/products';


const ProductInfo = () => {
  const {slug} = useParams()
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Find product by slug
    const foundProduct = products.find((item) => item.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

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

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.productImage}>
        <button className={styles.prevButton} onClick={prevImage}>
          &#10094;
        </button>
        <img
          src={product.img[currentImageIndex]}
          width={500}
          height={500}
          alt="Product"
        />
        <button className={styles.nextButton} onClick={nextImage}>
          &#10095;
        </button>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productPrice}>₹ {product.price}</div>
        <div className={styles.productOptions}>
          <div className={styles.productQuantity}>
            <button>-</button>
            <span style={{fontFamily:'Franklin Gothic Medium'}}>1</span>
            <button>+</button>
          </div>
          <div className={styles.addCartButton}>
            <button>Add to Cart</button>
          </div>
        </div>
        <div className={styles.productDescription}>
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
