import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useCart} from '../../context/CartContext'
import './index.css'

const Header = ({restaurantName, history}) => {
  const {cartList} = useCart()
  const count = cartList.reduce((sum, item) => sum + item.quantity, 0)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="restaurant-link">
          <h1 className="restaurant-name">
            {restaurantName || 'UNI Resto Cafe'}
          </h1>
        </Link>
        <div className="header-right">
          <p className="my-orders-text">My Orders</p>
          <Link to="/cart">
            <button
              type="button"
              className="cart-icon-wrapper"
              data-testid="cart"
            >
              <svg
                className="cart-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <p className="cart-badge">{count}</p>
            </button>
          </Link>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header)
