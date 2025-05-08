import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from "./pages/home";
//import Products from './pages/products';
//import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Register from './pages/register';




function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
