import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/dashboard';
import Detail from './components/details/detail';
import Cart from './components/cart/Cart';


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
      </Routes>
    </>
  )
}

export default App;
