import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; // retrieves a temporary notification ("flash message") sent via React Router’s navigation state, used to show success messages after actions like login or logout
import Carousel from "../components/carousel/Carousel";
import { Product } from "../types/product";
import Greeting from "../components/greeting";

// Define the props for the HomePage component
const HomePage: React.FC = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from the API
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products for the Deals section
  const Deals = products.filter((p) =>
    [
      "product_cuminSeeds",
      "product_cardamonPods",
      "product_rasElHanout",
      "product_bayLeaves",
      "product_chineseFiveSpice",
      "product_taco",
      "product_starAnis"
    ].includes(p.product_id)
  );

  const location = useLocation() // get React Router state
  const state = (location.state as { flash?: string }) ?? {}  // type‑cast state
  const [flash, setFlash] = useState<string | undefined>(state.flash) // initialize flash message
  
    // clear flash message after 2s
  useEffect(() => {  
    if (!flash) return  
    const t = setTimeout(() => setFlash(undefined), 2000)
    return () => clearTimeout(t)
  }, [flash])

  return (
    <div>
      {/* Welcome Banner */}
      <div className="container-fluid p-0 position-relative">
        <img
          src="http://localhost:3000/images/welcome-banner.jpg"
          alt="Welcome to Spice Planet"
          className="img-fluid w-100"
          style={{ height: "300px", objectFit: "cover" }}
        />
  
        <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 text-white p-4 rounded">
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <h4 className="mb-0"><Greeting /></h4>
          <div className="d-flex align-items-center">
            <img
              src="http://localhost:3000/images/logos/spiceplanet-icon-white.png"
              className="me-2 mb-0"
              style={{ height: "3em", width: "auto" }}
              alt="Spice Planet Icon"
            />
            <h2 className="fw-bold mb-0">Welcome to Spice Planet</h2>
          </div>
        </div>

      </div>
    </div>

      {/* Fan Favourites Section */}
<div className="container mt-5">
  <div className="text-center mb-4">
    <h3 className="fw-semibold" style={{ color: "var(--primary-orange)" }}>
      Signature Spices
    </h3>
    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
      Essential flavours from our collection.
    </p>
  </div>

  <Carousel id="dealsCarousel" products={Deals} />
</div>


    </div>
  );
};

export default HomePage;
