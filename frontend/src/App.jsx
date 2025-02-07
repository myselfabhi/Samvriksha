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
import Login from '../pages/Login/Login';
import { AuthProvider, useAuth } from './AuthContext';
import { FaCircleUser } from "react-icons/fa6";
import { RiLoginBoxFill } from "react-icons/ri";
import Register from '../pages/Register/Register';



function AppContent() {
  const navigate = useNavigate();
  const { cart } = useCart(); 
  const { user, logout } = useAuth();




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
        <div className='btnGroup'>
          <div className='cartButton' onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer' }}>
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
          {user ? (<div className='userButton' style={{ cursor: 'pointer', display:"inline-block" }}>
          <FaCircleUser size={30} />
          <ul className='dropdown'>
                    <li>Hi! {user.firstName}</li>
                    <li>Orders</li>
                    <li onClick={() => logout()}>Logout</li>
                </ul>
          </div>) : (
            <div className='loginButton'  style={{ display:"flex",alignItems:'center',justifyContent:'center' }}>
              {/* <RiLoginBoxFill size={30} /> */}
              <button onClick={() => navigate('/login')} style={{padding:'4px 6px',border:'1px solid black',backgroundColor:'#00ED64',cursor:'pointer',borderRadius:'4px'}}>Login</button>
            </div>  
          )} 
        </div>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
    <AuthProvider>
    <CartProvider>
      <AppContent />
    </CartProvider>
    </AuthProvider>
  );
}

export default App;

