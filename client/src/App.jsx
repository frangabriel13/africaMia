import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;
