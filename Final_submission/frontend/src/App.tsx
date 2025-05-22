import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import AllProductsPage from "./pages/allProducts";
import BasketPage from "./pages/basket";
import CheckoutPage from "./pages/checkout";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Footer from "./components/footer";
import { ProductDetail } from "./pages/productDetail";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<AllProductsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
