import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Detail from './components/details/detail';
import Cart from './components/cart/Cart';
import ProductsByCategory from './components/productsByCategory/ProductByCategory';
import Categories from './components/categories/categories';
import Login from './components/login/Login';
import CreateUser from './components/createUser/CreateUser';

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.includes('dashboard');

  return (
    <>
      {!isDashboard && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/products/:id' element={<Detail />} /> 
        <Route path='/cart' element={<Cart/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/:categoryId' element={<ProductsByCategory/>} />

        <Route path='/login-admin' element={<Login />} />
        <Route path='/create-admin' element={<CreateUser />} />
      </Routes>
    </>
  )
}

export default App;
