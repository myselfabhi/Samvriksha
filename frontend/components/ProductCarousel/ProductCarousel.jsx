import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductCarousel.module.css';

const ProductCard = ({ product }) => {
  // Extract variants and colors
  const variants = product.variants.map((variant) => variant.name);
  const colors = product.variants.flatMap((variant) => variant.colors);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={product.img[0]} alt={product.name} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description.substring(0, 100)}...</p>
        {/* {variants.length > 0 && (
          <div className={styles.variants}>
            {variants.map((variant, index) => (
              <span key={index} className={styles.variant}>
                {variant}
              </span>
            ))}
          </div>
        )}
        {colors.length > 0 && (
          <div className={styles.colors}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={styles.color}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )} */}
        <a href={`/productInfo/${product.slug}`} className={styles.button}>
          View Product
        </a>
      </div>
    </div>
  );
};

const ProductCarousel = ({products}) => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false, // Disable center mode
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2, // Show 2 cards at a time
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1, // Show 1 card at a time
        },
      },
    ],
  };

  // Get the first four products
  const firstSixProducts = products.slice(0, 6);

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {firstSixProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;