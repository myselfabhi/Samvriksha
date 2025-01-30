// import Cart from '../components/Cart/Cart';
// import Navbar from '../components/Navbar/Navbar';
// import ProductInfo from '../components/ProductInfo/ProductInfo';
// import Home from '../pages/Home/Home';
// import Payment from '../pages/Payment/Payment';
// import Products from '../pages/Products/Products';
// import './App.css'
// import { TiShoppingCart } from "react-icons/ti";

// import { Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';
// import { CartProvider, useCart } from './CartContext';


// function App() {
//   const navigate = useNavigate()
//   const {cart} = useCart()

//   const totalItems = cart.reduce((acc,item) => acc + item.quantity,0)


//   return (
//   <div className='app'>
//     <div className='navSection'>
//       <div className='logo'>
//       <img src='./logo.PNG' width={150} height={36} />
//       </div>
//       <div className='navItems'>
//       <Navbar />
//       </div>
//       <div className='cartButton'>
//       <div onClick={() => navigate('/cart')} style={{position:'relative',cursor:'pointer'}}>
//         <TiShoppingCart size={30}/>
//         {totalItems > 0 && (<span style={{position:'absolute',backgroundColor:'red',color:'white',borderRadius:'50%',width:'20px',height:"20px",display:'flex',justifyContent:'center',alignItems:'center',top:'-5px',right:'-5px'}}>
//           2
//         </span>)}
//         </div>
//       </div>
//     </div>
//     <CartProvider>
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/products/:category' element={<Products/>}/>
//       <Route path='/productInfo/:slug' element={<ProductInfo/>}/>
//       <Route path='/cart' element={<Cart/>}/>
//       <Route path='/payment' element={<Payment/>}/>
//     </Routes>
//     </CartProvider>
//   </div>
      
//   )
// }

// export default App
import Cart from '../components/Cart/Cart';
import Navbar from '../components/Navbar/Navbar';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import Home from '../pages/Home/Home';
import Payment from '../pages/Payment/Payment';
import Products from '../pages/Products/Products';
import './App.css';
import { TiShoppingCart } from "react-icons/ti";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext';

function AppContent() {
  const navigate = useNavigate();
  const { cart } = useCart(); 

  // Calculate total quantity of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='app'>
      <div className='navSection'>
        <div className='logo'>
          <img src='./logo.PNG' width={150} height={36} alt="Logo" />
        </div>
        <div className='navItems'>
          <Navbar />
        </div>
        <div className='cartButton'>
          <div onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer' }}>
            <TiShoppingCart size={30} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                fontFamily: 'Franklin Gothic',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: "20px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '-5px',
                right: '-5px',
                fontSize: '12px'
              }}>
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:category' element={<Products />} />
        <Route path='/productInfo/:slug' element={<ProductInfo />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;

