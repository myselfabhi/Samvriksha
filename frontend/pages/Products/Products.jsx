import React from 'react'
import styles from './Products.module.css'
import ProductCard from '../../components/ProductCard/ProductCard'
import { products } from '../../src/products'

const Products = () => {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.filterSection}>

      </div>
      <div className={styles.productSection}>
      {products.map(product => (
        <ProductCard key={product.id}  id={product.id} name={product.name} img={product.img} description={product.description} slug={product.slug} price={product.price}/>
      ))}
      </div>
    </div>
  )
}

export default Products