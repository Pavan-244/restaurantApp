import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react'

const CartContext = createContext(null)

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({})

  const addToCart = useCallback(dishId => {
    if (!dishId) return // Guard against undefined dishId

    setCartItems(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }, [])

  const removeFromCart = useCallback(dishId => {
    if (!dishId) return // Guard against undefined dishId

    setCartItems(prev => {
      const currentCount = prev[dishId] || 0

      // If count is 0 or doesn't exist, do nothing (prevent negative)
      if (currentCount <= 0) {
        return prev
      }

      // If count is 1, remove the key entirely
      if (currentCount === 1) {
        const {[dishId]: removed, ...rest} = prev
        return rest
      }

      // Otherwise decrement by 1
      return {
        ...prev,
        [dishId]: currentCount - 1,
      }
    })
  }, [])

  const getCartCount = useCallback(
    () => Object.values(cartItems).reduce((sum, count) => sum + count, 0),
    [cartItems],
  )

  // Ensure this always returns a number, never undefined
  const getItemCount = useCallback(
    dishId => {
      if (!dishId) return 0
      return cartItems[dishId] || 0
    },
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      getCartCount,
      getItemCount,
    }),
    [cartItems, addToCart, removeFromCart, getCartCount, getItemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
