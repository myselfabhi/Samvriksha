// import React, { useEffect, useState } from 'react';
// import styles from './Products.module.css';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import { products } from '../../src/products';
// import { useLocation, useParams } from 'react-router-dom';

// const Products = () => {
//   const location = useLocation();
//   const {category} = useParams()


//   const [priceRange, setPriceRange] = useState([0, 20000]);
//   const [selectedType, setSelectedType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);


//   useEffect(() => {
//     // Clear search term when navigating to a new category
//     setSearchTerm('');
//   }, [category]);

//   // Filter products based on category
//   const filteredByCategory = products.filter(product => product.category.includes(category));

//   // Additional filters
//   const filteredProducts = filteredByCategory.filter(product => {
//     const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
//     const matchesType = selectedType ? product.type.includes(selectedType) : true;
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return inPriceRange && matchesType && matchesSearch;
//   });

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // Generate suggestions based on search term
//     if (value) {
//       const matchedSuggestions = filteredByCategory.filter(product =>
//         product.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(matchedSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (name) => {
//     setSearchTerm(name);
//     setSuggestions([]);
//   };

//   const categoryTitle =
//     category === 'farming'
//       ? 'Sustainable Farming'
//       : category === 'decor'
//       ? 'Sustainable Decor'
//       : category === 'gift'
//       ? 'Sustainable Gifting'
//       : 'Nature-Based Solutions';

//   const categoryDescription =
//     category === 'farming'
//       ? 'Sustainable farming is all about growing food within city environments in a way that minimizes environmental impact and reduces carbon footprint. It incorporates methods like vertical farming, hydroponics, and rooftop gardens.'
//       : category === 'decor'
//       ? 'Products that help you decorate your home.'
//       : category === 'gift'
//       ? 'Sustainable gifting emphasizes the use of natural, eco-friendly materials for products, avoiding plastics and harmful synthetics. Thoughtfully packaged in biodegradable or reusable materials, these gifts celebrate nature while reducing environmental impact.'
//       : 'Nature-based solutions are actions to protect, sustainably manage, and restore natural or modified ecosystems, that address societal challenges effectively and adaptively, simultaneously providing human well-being and biodiversity benefits.';

//   return (
//     <div className={styles.productsContainer}>
//       <div className={styles.filterSection}>
//         <div className={styles.infoBox}>
//           <h2>{categoryTitle}</h2>
//           <p>{categoryDescription}</p>
//         </div>
//         <div className={styles.filterBox}>
//           <div>
//             <label htmlFor="search">Search:</label>
//             <input
//               id="search"
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search products..."
//             />
//             {suggestions.length > 0 && (
//               <ul className={styles.suggestionsList}>
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion.id}
//                     onClick={() => handleSuggestionClick(suggestion.name)}
//                   >
//                     {suggestion.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div>
//             <label htmlFor="type">Type:</label>
//             <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
//               <option value="">All Types</option>
//               <option value="indoor">Indoor</option>
//               <option value="outdoor">Outdoor</option>
//               {/* Add more types as needed */}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="price">Price Range:</label>
//             <input
//               id="price"
//               type="range"
//               min="0"
//               max="20000"
//               value={priceRange[1]}
//               onChange={e => setPriceRange([0, +e.target.value])}
//             />
//             <span style={{fontFamily:'Franklin Gothic Medium'}}>
//               ₹{priceRange[0]} - ₹{priceRange[1]}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className={styles.productSection}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <ProductCard
//               key={product.id}
//               product={product}
//             />
//           ))
//         ) : (
//           <p style={{display:'flex',flex:'1',justifyContent:'center',alignItems:'center'}}>No products available for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Products = () => {
  const { category } = useParams();
  const [hideDescription, setHideDescription] = useState(false);
  const productSectionRef = useRef(null); // Reference for product section


  const [products, setProducts] = useState([]); // Store products from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showFilterBox, setShowFilterBox] = useState(false); // State to manage filter box visibility


  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Clear search term when navigating to a new category
    setSearchTerm('');
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (productSectionRef.current) {
        setHideDescription(productSectionRef.current.scrollTop > 50);
      }
    };

    const productSection = productSectionRef.current;
    if (productSection) {
      productSection.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (productSection) {
        productSection.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Filter products based on category
  const filteredByCategory = products.filter(product => product.category.includes(category));

  // Additional filters
  const filteredProducts = filteredByCategory.filter(product => {
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesType = selectedType ? product.type.includes(selectedType) : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return inPriceRange && matchesType && matchesSearch;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Generate suggestions based on search term
    if (value) {
      const matchedSuggestions = filteredByCategory.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  const categoryTitle =
    category === 'farming'
      ? 'Sustainable Farming'
      : category === 'decor'
      ? 'Sustainable Decor'
      : category === 'gift'
      ? 'Sustainable Gifting'
      : 'Nature-Based Solutions';

  const categoryDescription =
    category === 'farming'
      ? 'Sustainable urban farming minimizes environmental impact and reduces carbon footprint through methods like vertical farming, hydroponics, and rooftop gardens.'
      : category === 'decor'
      ? 'Products that help you decorate your home while promoting sustainable gifting with eco-friendly materials and biodegradable or reusable packaging to celebrate nature and minimize environmental harm.'
      : category === 'gift'
      ? 'Sustainable gifting focuses on eco-friendly, natural materials and thoughtful, biodegradable or reusable packaging to celebrate nature and minimize environmental harm.'
      : 'Nature-based solutions protect, manage, and restore ecosystems to address societal challenges while enhancing human well-being and biodiversity.';

  return (
    <div className={styles.productsContainer}>
      <div className={styles.filterSection}>
        <div className={styles.infoBox}>
          <h2>{categoryTitle}</h2>
          {<p className={`${styles.catDes} ${hideDescription ? styles.hidden : ""}`}>{categoryDescription}</p>}
        </div>
        {/* Toggle Button for Mobile View */}
    <button
      className={styles.toggleButton}
      onClick={() => setShowFilterBox(!showFilterBox)}
    >
      {showFilterBox ? 'Hide Options' : 'View Options'}
    </button>
        <div className={`${styles.filterBox} ${
        showFilterBox ? styles.showFilterBox : ''
      }`}>        
        <div className={styles.searchBox}>
        <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.name)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <div>
            <label htmlFor="type">Type:</label>
            <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              <option value="">All Types</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div> */}
          <div className={styles.priceRange}>
          <label htmlFor="price">Price Range:</label>
            <input
              id="price"
              type="range"
              min="0"
              max="20000"
              value={priceRange[1]}
              onChange={e => setPriceRange([0, +e.target.value])}
            />
            <span style={{ fontFamily: 'Franklin Gothic Medium' }}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.productSection} ref={productSectionRef}>
        {loading ? (
          <Loader/>
          // <p style={{ textAlign: 'center' }}>Loading products...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
            No products available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
