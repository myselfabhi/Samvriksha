import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import Payment from '../pages/Payment/Payment';
import Products from '../pages/Products/Products';
import './App.css'
import { Routes, Route, Router, Navigate } from 'react-router-dom';


function App() {

  return (
  <div className='app'>
    <div className='navSection'>
      <Navbar />
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
