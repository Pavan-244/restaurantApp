import {createContext, useState, useContext, useCallback, useMemo} from 'react'

const CartContext = createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = useCallback(dish => {
    setCartList(prev => {
      const existingIndex = prev.findIndex(
        item => item.dish_id === dish.dish_id,
      )
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (dish.quantity || 1),
        }
        return updated
      }
      return [...prev, {...dish, quantity: dish.quantity || 1}]
    })
  }, [])

  const removeCartItem = useCallback(dishId => {
    setCartList(prev => prev.filter(item => item.dish_id !== dishId))
  }, [])

  const removeAllCartItems = useCallback(() => {
    setCartList([])
  }, [])

  const incrementCartItemQuantity = useCallback(dishId => {
    setCartList(prev =>
      prev.map(item => {
        if (item.dish_id === dishId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    )
  }, [])

  const decrementCartItemQuantity = useCallback(dishId => {
    setCartList(prev => {
      const item = prev.find(i => i.dish_id === dishId)
      if (item && item.quantity <= 1) {
        return prev.filter(i => i.dish_id !== dishId)
      }
      return prev.map(i =>
        i.dish_id === dishId ? {...i, quantity: i.quantity - 1} : i,
      )
    })
  }, [])

  const value = useMemo(
    () => ({
      cartList,
      addCartItem,
      removeCartItem,
      removeAllCartItems,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
    }),
    [
      cartList,
      addCartItem,
      removeCartItem,
      removeAllCartItems,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  return context
}

export default CartContext
