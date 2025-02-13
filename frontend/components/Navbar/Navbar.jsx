// import React from 'react'
// import styles from './Navbar.module.css'
// import { Link, useNavigate } from 'react-router-dom'


// const Navbar = () => {
//     const navigate = useNavigate()
//   return (
//     <div className={styles.navbar}>
//         <ul>
//             {/* <li onClick={() => navigate('/')}>Home</li>
//             <li><span>Sustainable Farming</span>
//                 <ul className={styles.dropdown}>
//                     <li onClick={() => navigate('/products')}>Indoor Wish Tree</li>
//                     <li onClick={() => navigate('/products')}>Outdoor Wish Tree</li>
//                     <li onClick={() => navigate('/products')}>Balcony Bageecha</li>
//                 </ul></li>
//             <li>
//                 <span>Sustainable Decor</span>
//                 <ul className={styles.dropdown}>
//                     <li onClick={() => navigate('/products')}>Bookshelf</li>
//                     <li onClick={() => navigate('/products')}>Samjyoti Lamo</li>
//                 </ul>
//             </li>
//             <li><span>Sustainable Gifting</span>
//                 <ul className={styles.dropdown}>
//                     <li onClick={() => navigate('/products')}>Resin Art</li>
//                     <li onClick={() => navigate('/products')}>Resin and Light</li>
//                     <li onClick={() => navigate('/products')}>Moss Frame</li>
//                 </ul></li>
//             <li><span>Nature-Based Solutions</span>
//                 <ul className={styles.dropdown}>
//                     <li onClick={() => navigate('/products')}>Nature-Based Air Purifier</li>
//                 </ul></li> */}
//             <Link style={{textDecoration:'none'}} to={'/'}><li>Home</li></Link>
//             <Link style={{textDecoration:'none'}} to={`/products/${'farming'}`}><li><span>Sustainable Farming</span></li></Link>
//             <Link style={{textDecoration:'none'}} to={`/products/${'decor'}`}><li><span>Sustainable Decor</span></li></Link>
//             <Link style={{textDecoration:'none'}} to={`/products/${'gift'}`}><li><span>Sustainable Gifting</span></li></Link>
//             <Link style={{textDecoration:'none'}} to={`/products/${'nbs'}`}><li><span>Nature-Based Solutions</span></li></Link>
//             {/* <li onClick={() => navigate('/')}>Home</li> */}
//             {/* <li onClick={() => navigate('/products', {state: {category:'farming'}})}><span><Link to={`/products/${category}`}>Sustainable Farming</Link></span></li> */}
//             {/* <li onClick={() => navigate('/products', {state: {category:'decor'}})}><span>Sustainable Decor</span></li>
//             <li onClick={() => navigate('/products', {state: {category:'gift'}})}><span>Sustainable Gifting</span></li>
//             <li onClick={() => navigate('/products', {state: {category:'nbs'}})}><span>Nature-Based Solutions</span></li> */}
//         </ul>
//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
            <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
                <Link style={{textDecoration:'none'}} to={'/'} onClick={() => setMenuOpen(false)}><li>Home</li></Link>
                <Link style={{textDecoration:'none'}} to={`/products/farming`} onClick={() => setMenuOpen(false)}><li>Sustainable Farming</li></Link>
                <Link style={{textDecoration:'none'}} to={`/products/decor`} onClick={() => setMenuOpen(false)}><li>Sustainable Decor</li></Link>
                <Link style={{textDecoration:'none'}} to={`/products/gift`} onClick={() => setMenuOpen(false)}><li>Sustainable Gifting</li></Link>
                <Link style={{textDecoration:'none'}} to={`/products/nbs`} onClick={() => setMenuOpen(false)}><li>Nature-Based Solutions</li></Link>
            </ul>
        </nav>
    );
};

export default Navbar;
