import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import { Product } from "../types/product";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
      <div className="container-fluid p-0 position-relative">
        <img
          src="http://localhost:3000/images/welcome-banner.jpg"
          alt="Welcome to Spice Planet"
          className="img-fluid w-100"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center bg-dark bg-opacity-50 text-white p-4 rounded">
          <img
            src="http://localhost:3000/images/logos/spiceplanet-icon-white.png"
            className="me-2"
            style={{ height: "3em", width: "auto" }}
            alt="Spice Planet Icon"
          />
          <h2 className="fw-bold mb-0">Welcome to Spice Planet</h2>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center">Deals</h2>
        <Carousel id="featuredCarousel" products={Deals} />
      </div>
    </div>
  );
};

export default HomePage;
