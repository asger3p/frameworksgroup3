// Description: Renders an “Add to Cart” button for a given product. When clicked, it picks a size (default 100 g if available, or the first size), uses the provided quantity (default 1), builds a CartItem object, and calls the cart context’s addItem function to add it to the user’s cart.

import React from 'react'
import { useCart } from '../context/cartContext'
import { Product, Size } from '../types/product'
import { CartItem } from '../types/cart'

interface AddToCartButtonProps {
  product: Product
  quantity?: number  /** how many to add; defaults to 1 */
  selectedSize?: Size /** which size to add; if omitted, we’ll default to “100 g” or first size */
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1, // default 1 piece
  selectedSize,
}) => {
  const { addItem } = useCart()

  // pick “100 g” if it exists, else fall back to first size
  const defaultSize =
    product.sizes.find((s) => s.size === '100 g') ?? product.sizes[0]
  const sizeToAdd = selectedSize ?? defaultSize

  const handleClick = () => { // building a CartItem object matching our cartContext shape
    const item: CartItem = {
      productId: product.product_id,
      name: product.name,
      price: sizeToAdd.price,
      quantity,
      imageUrl: product.image,
    }
    addItem(item) // add the item to the cart via our context
  }

  return ( // bootstrap-styled button that fires handleClick on user click
    <button className="btn add-to-cart" onClick={handleClick}>  
      ADD TO CART
    </button>
  )
}

export default AddToCartButton
