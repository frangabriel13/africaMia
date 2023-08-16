import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/dashboard';

function App() {
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;
