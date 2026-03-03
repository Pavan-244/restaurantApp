import {useCart} from '../../context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const {addToCart, removeFromCart, getItemCount} = useCart()

  // Ensure count is always a number, never undefined
  const count = getItemCount(dish.dish_id) || 0

  // Check availability - API uses dish_Availability (with underscore and capital A)
  const isAvailable = dish.dish_Availability !== false

  // Check addons - API uses addonCat
  const hasAddons = dish.addonCat && dish.addonCat.length > 0

  const handleDecrement = () => {
    // Strict check: only proceed if count is greater than 0
    if (count > 0) {
      removeFromCart(dish.dish_id)
    }
  }

  const handleIncrement = () => {
    addToCart(dish.dish_id)
  }

  return (
    <div className={`dish-item ${!isAvailable ? 'unavailable' : ''}`}>
      <div className="dish-content">
        <div className="dish-info">
          <div className="dish-header">
            <span
              className={`availability-indicator ${
                isAvailable ? 'available' : 'not-available'
              }`}
            />
            <h3 className="dish-name">{dish.dish_name}</h3>
          </div>

          <div className="dish-meta">
            <span className="dish-price">SAR {dish.dish_price}</span>
            <span className="dish-calories">{dish.dish_calories} Calories</span>
          </div>

          <p className="dish-description">{dish.dish_description}</p>

          {hasAddons && (
            <p className="customizations">Customizations available</p>
          )}

          {isAvailable ? (
            <div className="quantity-controls">
              <button
                className="qty-btn minus"
                onClick={handleDecrement}
                disabled={count === 0}
                type="button"
              >
                -
              </button>
              <p className="qty-count">{count}</p>
              <button
                className="qty-btn plus"
                onClick={handleIncrement}
                type="button"
              >
                +
              </button>
            </div>
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
