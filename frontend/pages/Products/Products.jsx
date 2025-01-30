// import React, { useState } from 'react';
// import styles from './Products.module.css';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import { products } from '../../src/products';
// import { useLocation } from 'react-router-dom';

// const Products = () => {
//   const location = useLocation();
//   const { category } = location.state;

//   const [priceRange, setPriceRange] = useState([0, 20000]);
//   const [selectedType, setSelectedType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter products based on category
//   const filteredByCategory = products.filter(product => product.category.includes(category));

//   // Additional filters
//   const filteredProducts = filteredByCategory.filter(product => {
//     const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
//     const matchesType = selectedType ? product.type.includes(selectedType) : true;
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return inPriceRange && matchesType && matchesSearch;
//   });

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
//           {/* <h2>Filter</h2> */}
//           <div>
//             <label htmlFor="search">Search:</label>
//             <input
//               id="search"
//               type="text"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               placeholder="Search products..."
//             />
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
//             <span>
//             ₹{priceRange[0]} - ₹{priceRange[1]}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className={styles.productSection}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <ProductCard
//               key={product.id}
//               id={product.id}
//               name={product.name}
//               img={product.img}
//               description={product.description}
//               slug={product.slug}
//               price={product.price}
//               category={product.category}
//               type={product.type}
//             />
//           ))
//         ) : (
//           <p>No products available for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../src/products';
import { useLocation, useParams } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  // const { category } = location.state;
  const {category} = useParams()


  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Clear search term when navigating to a new category
    setSearchTerm('');
  }, [category]);

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
      ? 'Sustainable farming is all about growing food within city environments in a way that minimizes environmental impact and reduces carbon footprint. It incorporates methods like vertical farming, hydroponics, and rooftop gardens.'
      : category === 'decor'
      ? 'Products that help you decorate your home.'
      : category === 'gift'
      ? 'Sustainable gifting emphasizes the use of natural, eco-friendly materials for products, avoiding plastics and harmful synthetics. Thoughtfully packaged in biodegradable or reusable materials, these gifts celebrate nature while reducing environmental impact.'
      : 'Nature-based solutions are actions to protect, sustainably manage, and restore natural or modified ecosystems, that address societal challenges effectively and adaptively, simultaneously providing human well-being and biodiversity benefits.';

  return (
    <div className={styles.productsContainer}>
      <div className={styles.filterSection}>
        <div className={styles.infoBox}>
          <h2>{categoryTitle}</h2>
          <p>{categoryDescription}</p>
        </div>
        <div className={styles.filterBox}>
          <div>
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
          <div>
            <label htmlFor="type">Type:</label>
            <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              <option value="">All Types</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              {/* Add more types as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="price">Price Range:</label>
            <input
              id="price"
              type="range"
              min="0"
              max="20000"
              value={priceRange[1]}
              onChange={e => setPriceRange([0, +e.target.value])}
            />
            <span style={{fontFamily:'Franklin Gothic Medium'}}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.productSection}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              // id={product.id}
              // name={product.name}
              // img={product.img}
              // description={product.description}
              // slug={product.slug}
              // price={product.price}
              // category={product.category}
              // type={product.type}
            />
          ))
        ) : (
          <p style={{display:'flex',flex:'1',justifyContent:'center',alignItems:'center'}}>No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;


