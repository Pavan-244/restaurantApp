import {useState} from 'react'
import {useCart} from '../../context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const {addCartItem} = useCart()
  const [quantity, setQuantity] = useState(0)

  const isAvailable = dish.dish_Availability !== false
  const hasAddons = dish.addonCat && dish.addonCat.length > 0

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const handleAddToCart = () => {
    addCartItem({...dish, quantity})
  }

  const isVeg = dish.dish_Type === 1

  return (
    <div className={`dish-item ${!isAvailable ? 'unavailable' : ''}`}>
      <div className="dish-content">
        <div className="dish-info">
          <div className="dish-header">
            <span className={`type-indicator ${isVeg ? 'veg' : 'non-veg'}`}>
              <span className="type-dot" />
            </span>
            <h3 className="dish-name">{dish.dish_name}</h3>
          </div>

          <div className="dish-meta">
            <span className="dish-price">
              {dish.dish_currency} {dish.dish_price}
            </span>
            <span className="dish-calories">{dish.dish_calories} Calories</span>
          </div>

          <p className="dish-description">{dish.dish_description}</p>

          {hasAddons && (
            <p className="customizations">Customizations available</p>
          )}

          {isAvailable ? (
            <>
              <div className="quantity-controls">
                <button
                  className="qty-btn minus"
                  onClick={handleDecrement}
                  disabled={quantity === 0}
                  type="button"
                >
                  -
                </button>
                <p className="qty-count">{quantity}</p>
                <button
                  className="qty-btn plus"
                  onClick={handleIncrement}
                  type="button"
                >
                  +
                </button>
              </div>
              {quantity > 0 && (
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              )}
            </>
          ) : (
            <p className="not-available-text">Not available</p>
          )}
        </div>

        <div className="dish-image-container">
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="dish-image"
            onError={e => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DishItem
