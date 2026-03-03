import {useCart} from '../../context/CartContext'
import './index.css'

const CartItem = ({item}) => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useCart()

  const totalPrice = item.dish_price * item.quantity

  return (
    <li className="cart-item">
      <div className="cart-item-image-container">
        <img
          src={item.dish_image}
          alt={item.dish_name}
          className="cart-item-image"
        />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.dish_name}</h3>
        <div className="cart-item-controls">
          <button
            type="button"
            className="cart-qty-btn"
            onClick={() => decrementCartItemQuantity(item.dish_id)}
          >
            -
          </button>
          <span className="cart-qty-count">{item.quantity}</span>
          <button
            type="button"
            className="cart-qty-btn"
            onClick={() => incrementCartItemQuantity(item.dish_id)}
          >
            +
          </button>
        </div>
        <p className="cart-item-price">
          {item.dish_currency} {totalPrice.toFixed(2)}
        </p>
      </div>
      <button
        type="button"
        className="cart-remove-btn"
        onClick={() => removeCartItem(item.dish_id)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem
