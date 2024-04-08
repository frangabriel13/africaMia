import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Detail from './components/details/Detail';
import Cart from './components/cart/Cart';
import ProductsByCategory from './components/productsByCategory/ProductByCategory';
import Categories from './components/categories/Categories';
import Login from './components/login/Login';
import CreateUser from './components/createUser/CreateUser';
import Tienda from './components/tienda/Tienda';
import ComoComprar from './components/infoCompra/ComoComprar';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import MaintenanceNotice from './components/home/HomeService';


function App() {
  const location = useLocation();

  useEffect(() => {
    // Esta función se ejecutará cada vez que cambie la ubicación (la URL)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]); // Vuelve a ejecutar el efecto cuando cambie la ubicación (la URL) 

  const isDashboard = location.pathname.includes('dashboard');

 

  return (
    <>
      {!isDashboard && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<MaintenanceNotice />} /> */}
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/products/:id' element={<Detail />} /> 
        <Route path='/cart' element={<Cart/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/:categoryId' element={<ProductsByCategory/>} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/login-admin' element={<Login />} />
        <Route path='/create-admin' element={<CreateUser />} />
        <Route path='/como-comprar' element={<ComoComprar />} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  )
}

export default App;
