import Cart from '../components/Cart/Cart';
import Navbar from '../components/Navbar/Navbar';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import Home from '../pages/Home/Home';
import Payment from '../pages/Payment/Payment';
import Products from '../pages/Products/Products';
import './App.css'
import { TiShoppingCart } from "react-icons/ti";

import { Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate()


  return (
  <div className='app'>
    <div className='navSection'>
      <div className='logo'>
      <img src='./logo.PNG' width={150} height={36} />
      </div>
      <div className='navItems'>
      <Navbar />
      </div>
      <div className='cartButton'>
      <div onClick={() => navigate('/cart')} style={{position:'relative'}}><TiShoppingCart size={30}/><span style={{position:'absolute',backgroundColor:'red',color:'white',borderRadius:'50%',width:'20px',height:"20px",display:'flex',justifyContent:'center',alignItems:'center',top:'-5px',right:'-5px'}}>2</span></div>
      </div>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/productInfo/:slug' element={<ProductInfo/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment/>}/>
    </Routes>
  </div>
      
  )
}

export default App
