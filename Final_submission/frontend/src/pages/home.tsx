import React, { useEffect, useState } from "react";
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
      "product_taco"
    ].includes(p.product_id)
  );

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
          <h4 className="mb-2"><Greeting /></h4>
          <div className="d-flex align-items-center">
            <img
              src="http://localhost:3000/images/logos/spiceplanet-icon-white.png"
              className="me-2"
              style={{ height: "3em", width: "auto" }}
              alt="Spice Planet Icon"
            />
            <h2 className="fw-bold mb-0">Welcome to Spice Planet</h2>
          </div>
        </div>

      </div>
    </div>

      {/* Deals Carousel */}
      <div className="container mt-4">
        <h2 className="text-center">Deals</h2>
        <Carousel id="dealsCarousel" products={Deals} />
      </div>
    </div>
  );
};

export default HomePage;
