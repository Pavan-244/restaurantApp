import Header from '../Header'
import CartItem from '../CartItem'
import {useCart} from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useCart()

  const renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <p className="empty-cart-text">Your cart is empty</p>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-content">
      <div className="cart-header-row">
        <h2 className="cart-heading">My Cart</h2>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-list">
        {cartList.map(item => (
          <CartItem key={item.dish_id} item={item} />
        ))}
      </ul>
      <div className="cart-summary">
        <p className="cart-total">
          Order Total:{' '}
          <span className="total-amount">
            {cartList.length > 0 ? cartList[0].dish_currency : 'SAR'}{' '}
            {cartList
              .reduce((sum, item) => sum + item.dish_price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <div className="cart-page">
      <Header restaurantName="UNI Resto Cafe" />
      <div className="cart-main">
        {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
