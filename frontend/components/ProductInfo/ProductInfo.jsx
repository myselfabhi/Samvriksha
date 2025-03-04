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


// import React, { useEffect, useState } from 'react';
// import styles from './ProductInfo.module.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCart } from '../../src/CartContext';
// import Loader from '../Loader/Loader';

// const ProductInfo = () => {
//   const { slug } = useParams();
//   const { addToCart } = useCart();
//   const navigate = useNavigate()
//   const [product, setProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
        
//         const response = await fetch(`http://localhost:3000/api/products/${slug}`);
//         if (!response.ok) {
//           throw new Error('Product not found');
//         }
//         const data = await response.json();
//         setProduct(data);
//         setSelectedColor(data.colors?.length ? data.colors[0] : null);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   // if (!product) {
//   //   return <div className={styles.error}>Product not found</div>;
//   // }

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

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


//   const handleAddToCart = () => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     } else {
//       addToCart(product, selectedColor, quantity); // Pass quantity along with color
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className={styles.productInfoContainer}>
//       <div className={styles.productImage}>
//         <button className={styles.prevButton} onClick={prevImage}>&#10094;</button>
//         <img src={product.img[currentImageIndex]} width={500} height={500} alt="Product" />
//         <button className={styles.nextButton} onClick={nextImage}>&#10095;</button>
//       </div>
//       <div className={styles.productDetails}>
//         <div className={styles.productName}>{product.name}</div>
//         <div className={styles.productPrice}>₹ {product.price}</div>
//         <div className={styles.productOptions}>
//           {product.colors?.length > 0 && (
//             <div className={styles.productColor}>
//               <span>Colors:</span>
//               {product.colors.map((color) => (
//                 <div
//                   key={color}
//                   style={{ backgroundColor: color, outline: selectedColor === color ? '3px solid black' : 'none', cursor: 'pointer' }}
//                   className={styles.colorOption}
//                   onClick={() => setSelectedColor(color)}
//                 ></div>
//               ))}
//             </div>
//           )}
//           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
//             <div className={styles.productQuantity}>
//               <button onClick={decreaseQuantity}>-</button>
//               <span style={{ fontFamily: 'Franklin Gothic Medium' }}>{quantity}</span>
//               <button onClick={increaseQuantity}>+</button>
//             </div>
//             <div className={styles.addCartButton}>
//               <button onClick={handleAddToCart}>Add To Cart</button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.productDescription}>{product.description}</div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;





















// import React, { useEffect, useState } from 'react';
// import styles from './ProductInfo.module.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCart } from '../../src/CartContext';
// import Loader from '../Loader/Loader';

// const ProductInfo = () => {
//   const { slug } = useParams();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${slug}`);
//         if (!response.ok) {
//           throw new Error('Product not found');
//         }
//         const data = await response.json();
//         setProduct(data);
//         setSelectedVariant(data.variants[0]); // Default to the first variant
//         setSelectedSize(data.variants[0]?.sizes[0]); // Default to the first size
//         setSelectedDesign(data.variants[0]?.designs?.[0]); // Default to the first design
//         setSelectedColor(data.variants[0]?.colors?.[0]); // Default to the first color
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

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

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//     } else {
//       const cartItem = {
//         product,
//         variant: selectedVariant,
//         size: selectedSize,
//         design: selectedDesign,
//         color: selectedColor,
//         additionalOptions: selectedOptions,
//         quantity,
//       };
//       addToCart(cartItem);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

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
//         <div className={styles.productPrice}>
//           ₹ {selectedSize?.price || selectedVariant?.sizes[0]?.price}
//         </div>
//         <div className={styles.productOptions}>
//           {/* Variant Selection */}
//           {product.variants.length > 1 && (
//             <div className={styles.productOption}>
//               <span>Variant:</span>
//               <select
//               className={styles.variantSelect}
//                 value={selectedVariant?.name}
//                 onChange={(e) => {
//                   const variant = product.variants.find(
//                     (v) => v.name === e.target.value
//                   );
//                   setSelectedVariant(variant);
//                   setSelectedSize(variant.sizes[0]); // Reset to the first size
//                   setSelectedDesign(variant.designs?.[0]); // Reset to the first design
//                   setSelectedColor(variant.colors?.[0]); // Reset to the first color
//                 }}
//               >
//                 {product.variants.map((variant) => (
//                   <option className={styles.variantOption} key={variant.name} value={variant.name}>
//                     {variant.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Size Selection */}
//           {selectedVariant?.sizes.length > 1 && (
//             <div className={styles.productOption}>
//               <span>Size:</span>
//               <select
//               className={styles.sizeSelect}
//                 value={selectedSize?.size}
//                 onChange={(e) => {
//                   const size = selectedVariant.sizes.find(
//                     (s) => s.size === e.target.value
//                   );
//                   setSelectedSize(size);
//                 }}
//               >
//                 {selectedVariant.sizes.map((size) => (
//                   <option key={size.size} value={size.size}>
//                     {size.size} (₹{size.price})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Design Selection */}
//           {selectedVariant?.designs?.length > 1 && (
//             <div className={styles.productOption}>
//               <span>Design:</span>
//               <select
//               className={styles.designSelect}
//                 value={selectedDesign}
//                 onChange={(e) => setSelectedDesign(e.target.value)}
//               >
//                 {selectedVariant.designs.map((design) => (
//                   <option key={design} value={design}>
//                     {design}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Color Selection */}
//           {selectedVariant?.colors?.length > 0 && (
//             <div className={styles.productOption}>
//               <span>Color:</span>
//               <div className={styles.colorOptions}>
//                 {selectedVariant.colors.map((color) => (
//                   <div
//                     key={color}
//                     style={{
//                       backgroundColor: color,
//                       outline: selectedColor === color ? '3px solid black' : 'none',
//                       cursor: 'pointer',
//                     }}
//                     className={styles.colorOption}
//                     onClick={() => setSelectedColor(color)}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Additional Options */}
//           {selectedVariant?.additionalOptions?.length > 0 && (
//             <div className={styles.productAddOption}>
//               <span>Options:</span>
//               {selectedVariant.additionalOptions.map((option) => (
//                 <div key={option.name} className={styles.option}>
//                   <input
//                     type="checkbox"
//                     id={option.name}
//                     checked={selectedOptions.includes(option)}
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedOptions([...selectedOptions, option]);
//                       } else {
//                         setSelectedOptions(
//                           selectedOptions.filter((o) => o !== option)
//                         );
//                       }
//                     }}
//                   />
//                   <label htmlFor={option.name}>
//                     {option.name} (+₹{option.price})
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Quantity and Add to Cart */}
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: '20px',
//             }}
//           >
//             <div className={styles.productQuantity}>
//               <button onClick={decreaseQuantity}>-</button>
//               <span style={{ fontFamily: 'Franklin Gothic Medium' }}>{quantity}</span>
//               <button onClick={increaseQuantity}>+</button>
//             </div>
//             <div className={styles.addCartButton}>
//               <button onClick={handleAddToCart}>Add To Cart</button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.productDescription}>{product.description}</div>
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
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
        setSelectedVariant(data.variants[0]); // Default to the first variant
        setSelectedSize(data.variants[0]?.sizes[0]); // Default to the first size
        setSelectedDesign(data.variants[0]?.designs?.[0]); // Default to the first design
        setSelectedColor(data.variants[0]?.colors?.[0]); // Default to the first color
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Automatic slideshow logic
  useEffect(() => {
    if (!product || !product.img || product.img.length <= 1) return; // No slideshow if there's only one image

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.img.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [product]); // Run this effect whenever `product` changes

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
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      const cartItem = {
        product,
        variant: selectedVariant,
        size: selectedSize,
        design: selectedDesign,
        color: selectedColor,
        additionalOptions: selectedOptions,
        quantity,
      };
      addToCart(cartItem);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
        <div className={styles.productPrice}>
          ₹ {selectedSize?.price || selectedVariant?.sizes[0]?.price}
        </div>
        <div className={styles.productOptions}>
          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className={styles.productOption}>
              <span>Variant:</span>
              <select
                className={styles.variantSelect}
                value={selectedVariant?.name}
                onChange={(e) => {
                  const variant = product.variants.find(
                    (v) => v.name === e.target.value
                  );
                  setSelectedVariant(variant);
                  setSelectedSize(variant.sizes[0]); // Reset to the first size
                  setSelectedDesign(variant.designs?.[0]); // Reset to the first design
                  setSelectedColor(variant.colors?.[0]); // Reset to the first color
                }}
              >
                {product.variants.map((variant) => (
                  <option className={styles.variantOption} key={variant.name} value={variant.name}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size Selection */}
          {selectedVariant?.sizes.length > 1 && (
            <div className={styles.productOption}>
              <span>Size:</span>
              <select
                className={styles.sizeSelect}
                value={selectedSize?.size}
                onChange={(e) => {
                  const size = selectedVariant.sizes.find(
                    (s) => s.size === e.target.value
                  );
                  setSelectedSize(size);
                }}
              >
                {selectedVariant.sizes.map((size) => (
                  <option key={size.size} value={size.size}>
                    {size.size} (₹{size.price})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Design Selection */}
          {selectedVariant?.designs?.length > 1 && (
            <div className={styles.productOption}>
              <span>Design:</span>
              <select
                className={styles.designSelect}
                value={selectedDesign}
                onChange={(e) => setSelectedDesign(e.target.value)}
              >
                {selectedVariant.designs.map((design) => (
                  <option key={design} value={design}>
                    {design}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Selection */}
          {selectedVariant?.colors?.length > 0 && (
            <div className={styles.productOption}>
              <span>Color:</span>
              <div className={styles.colorOptions}>
                {selectedVariant.colors.map((color) => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: color,
                      outline: selectedColor === color ? '3px solid black' : 'none',
                      cursor: 'pointer',
                    }}
                    className={styles.colorOption}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Options */}
          {selectedVariant?.additionalOptions?.length > 0 && (
            <div className={styles.productAddOption}>
              <span>Options:</span>
              {selectedVariant.additionalOptions.map((option) => (
                <div key={option.name} className={styles.option}>
                  <input
                    type="checkbox"
                    id={option.name}
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOptions([...selectedOptions, option]);
                      } else {
                        setSelectedOptions(
                          selectedOptions.filter((o) => o !== option)
                        );
                      }
                    }}
                  />
                  <label htmlFor={option.name}>
                    {option.name} (+₹{option.price})
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '20px',
            }}
          >
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
