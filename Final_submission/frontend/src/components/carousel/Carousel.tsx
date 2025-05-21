import React, { useEffect, useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { Product } from "../../types/product";

// Define the props for the Carousel component
interface CarouselProps {
    id: string;
    products: Product[];
  }
  
  // Carousel component displays products in a responsive Bootstrap carousel
  const Carousel: React.FC<CarouselProps> = ({ id, products }) => {
    const [slides, setSlides] = useState<Product[][]>([]);
    const [cardsPerSlide, setCardsPerSlide] = useState<number>(4); // for width calculation
  
    useEffect(() => {
       // Determine number of product cards per slide based on window width
      const getCardsPerSlide = () => {
        if (window.innerWidth >= 1200) return 4; // large screens
        if (window.innerWidth >= 768) return 3; // tablets/laptops
        return 2;
      };

      // Group products into slides depending on cardsPerSlide
      const getSlides = (cards: Product[]) => {
        const cps = getCardsPerSlide();
        setCardsPerSlide(cps);
        const result: Product[][] = [];
        for (let i = 0; i < cards.length; i += cps) {
          result.push(cards.slice(i, i + cps));
        }
        return result;
      };

      // Update slides whenever the window is resized or products change
      const updateSlides = () => {
        setSlides(getSlides(products));
      };
  
      updateSlides();
      window.addEventListener("resize", updateSlides);
      return () => window.removeEventListener("resize", updateSlides);
    }, [products]);
  
    return (
      <div id={id} className="carousel slide mb-4">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div className="d-flex w-100 justify-content-center">
                {slide.map((product) => (
                  <div key={product.product_id} 
                  style={{
                    flex: `0 0 ${100 / cardsPerSlide}%`,
                    maxWidth: `${100 / cardsPerSlide}%`,
                    padding: "0 1rem",
                    boxSizing: "border-box",
                  }}
                  >
                  <ProductCard key={product.product_id} product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {slides.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default Carousel;