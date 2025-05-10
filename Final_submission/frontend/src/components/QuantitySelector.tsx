
//this component let the user choose an amount
//1. fix price update and rerender. Using hook?
//2. add button from Ida.

import React, { useState, useEffect } from 'react';


export function QuantitySelector() {

    const [quantity, setQuantity] = useState<number>(1); //the initial value is 1
    const [price, setPrice] = useState<number>(10);
    const unitPrice = 1;

    useEffect(() => {       //can be seen as a sideeffect which happens when the quantity changes. if you don't pass an array in the end, it will happen every time it renders
        setPrice(quantity * unitPrice);
    }, [quantity]);
    

    function increaseQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1); //You’re not defining prevQuantity — React injects it for you.
    }

    function decreaseQuantity() {
        setQuantity((prevQuantity) => prevQuantity > 1 ? prevQuantity - 1 : prevQuantity); //checks if quantity > 1
    }

    function calculatePrice() {

    }



    return <>
    {/*Dropdown Box */}
    <div className="dropdown w-100 mt-4">
        <div className="dropdown-box border p-2" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <h5 className="mb-0">Choose amount</h5>
        </div>
        <div className="dropdown-menu" id="sizeDropdown" aria-labelledby="dropdownMenuButton">
        </div>
    </div>
    {/*Quantity selector + price*/}
    <div className="w-100 mt-3">
        <label htmlFor="quantitySelector" className="form-label text-muted d-block">Quantity</label>
        <div className="d-flex justify-content-between align-items-center">
            
            {/*Quantity Selector*/}
            <div id="quantitySelector" className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary px-3 py-2" onClick={decreaseQuantity}>-</button>
                <input id="quantity" className="mx-1 fs-5 text-center w-25" type="number" value={quantity} min="1"></input>
                <button id="increase" className="btn btn-sm btn-outline-secondary px-3 py-2" onClick={increaseQuantity}>+</button>
            </div>
            {/*Price*/}
            <div id="price-container" className="price-box">
                <span id="price" data-value="0">0 kr</span>
            </div>
        </div>
        <div className="w-100 mt-3">
            {/*add to cart button*/}
            <button className="btn btn-primary px-4 py-2">ADD TO CART</button>
        </div>
    </div>
    </>
}