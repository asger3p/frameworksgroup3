// Description: Renders an “Add to Cart” button for a given product. When clicked, it picks a size (default 100 g if available, or the first size), uses the provided quantity (default 1), builds a BasketItem object, and calls the basket context’s addItem function to add it to the user’s basket.

import React, { useState, useEffect } from 'react'
import { useBasket } from '../context/basketContext'
import { Product, Size } from '../types/product'
import { BasketItem } from '../types/basket'


interface AddToBasketButtonProps {
  product: Product
  quantity?: number  /** how many to add; defaults to 1 */
  selectedSize?: Size /** which size to add; if omitted, we’ll default to “100 g” or first size */
  layout?: 'inline' | 'stacked' /** controls confirmation message placement */
}

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({
  product,
  quantity = 1, // default 1 piece
  selectedSize,
  layout = 'inline', // default layout: beside the button
}) => {
  const { addItem } = useBasket()
  const [justAdded, setJustAdded] = useState(false)

  // pick “100 g” if it exists, else fall back to first size
  const defaultSize =
    product.sizes.find((s) => s.size === '100 g') ?? product.sizes[0]
  const sizeToAdd = selectedSize ?? defaultSize

  const handleClick = () => { // building a BasketItem object matching our basketContext shape
    const item: BasketItem = {
      productId: product.product_id,
      name: product.name,
      size: sizeToAdd.size,
      price: sizeToAdd.price,
      quantity,
      imageUrl: product.image,
    }
    addItem(item) // add the item to the basket via our context
    
    setJustAdded(true) // show confirmation for 2s
    const id = window.setTimeout(() => setJustAdded(false), 2000)
    return () => window.clearTimeout(id) // clean up if unmounted before timeout fires
  }

  // Ensure any leftover timer is cleared on unmount
  useEffect(() => () => { setJustAdded(false) }, [])

  return layout === 'inline' ? (  // bootstrap-styled button that fires handleClick on user click
      <div className="d-flex align-items-center gap-2" style={{ position: 'relative' }}>
        <button className="btn add-to-cart" style={{ height: '40px' }} onClick={handleClick}>
          Add To Cart
        </button>
        {justAdded && (
          <div
            className="text-black bg-light px-2 py-1 rounded shadow-sm"
            style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
          >
            Added to cart!
          </div>
        )}
      </div>
    ) : (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button className="btn add-to-cart" style={{ height: '40px' }} onClick={handleClick}>
          Add To Cart
        </button>
        {justAdded && (
          <div
            className="mt-1 text-black"
            style={{
              fontSize: '0.85rem',
              position: 'absolute',
              left: 0,
              top: '100%',
              marginTop: '0.25rem',
            }}
          >
            Added to cart!
          </div>
        )}
      </div>
    );
  };

export default AddToBasketButton