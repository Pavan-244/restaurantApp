import React from 'react'
import {useCart} from '../../context/CartContext'
import './index.css'

const Header = ({restaurantName}) => {
  const {getCartCount} = useCart()
  const count = getCartCount()

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="restaurant-name">
          {restaurantName || 'UNI Resto Cafe'}
        </h1>
        <div className="cart-container">
          <p className="my-orders-text">My Orders</p>
          <div className="cart-icon-wrapper">
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2a1 1 0 000 2H6a1 1 0 00-1 1v11a3 3 0 003 3h8a3 3 0 003-3V6a1 1 0 00-1-1h-1a1 1 0 100-2 2 2 0 012 2v11a5 5 0 01-5 5H8a5 5 0 01-5-5V5z"
                clipRule="evenodd"
              />
              <path d="M7 8a1 1 0 012 0v8a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v8a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
