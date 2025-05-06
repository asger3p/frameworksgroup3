import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
//import Home from './pages/home';
//import Products from './pages/products';
//import ProductDetail from './pages/productDetail';
//import Cart from './pages/cart';
//import Checkout from './pages/checkout';
import Register from './pages/register';
import Login from './pages/login';
import Home from "./pages/home";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
