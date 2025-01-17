import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import Payment from '../pages/Payment/Payment';
import Products from '../pages/Products/Products';
import './App.css'
import { TiShoppingCart } from "react-icons/ti";

import { Routes, Route, Router, Navigate } from 'react-router-dom';


function App() {

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
      <div><TiShoppingCart size={30}/></div>
      </div>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/payment' element={<Payment/>}/>
    </Routes>
  </div>
      
  )
}

export default App
