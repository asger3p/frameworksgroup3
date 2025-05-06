import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import Navbar from './components/navbar';
//import Home from './pages/home';
//import Products from './pages/products';
//import ProductDetail from './pages/productDetail';
//import Cart from './pages/cart';
//import Checkout from './pages/checkout';
import Register from './pages/register';
import Login from './pages/login';
=======
import Home from "./pages/home";
>>>>>>> main

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
=======
      <Routes>
        <Route path="/" element={<Home />} />
>>>>>>> main
      </Routes>
    </div>
  );
}

export default App;
