

//this page consists of a navbar, a 
//1. you need to fix the prop for the produc and connect to database
//2. insert navbar
//3. insert footer

import { ProductImage, ProductImageProps } from "../components/ProductImage";
import { ProductInfo } from "../components/ProductInfo";

export function ProductDetail({src} : ProductImageProps) {
        return ( 
          <div className="container mt-5">
            <div className="row">
              {/* Left Column */}
              <div className="col-6 text-center">
                <ProductImage src={src} />
              </div>
      
              {/* Right Column */}
              <div className="col-6">
                <ProductInfo/>
              </div>
            </div>
          </div>
        );
}
