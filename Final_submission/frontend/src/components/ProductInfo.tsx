
//this component is showing the name, description and quantityoptions of a product


import { ProductTitle, } from "./ProductTitle";
import { QuantitySelector } from "./QuantitySelector";

export function ProductInfo() {

    const productName = "Cool Product";
    const productSubheading = "Best product in the world";
    const productDescription = "This product does amazing things. You will love it.";

    return <>
    <div className="col-6">
    <ProductTitle productName={productName} productSubheading={productSubheading} productDescription={productDescription}/> 
    <QuantitySelector/>
    </div>


    {/*add to cart button*/}
        
    </>


    
}