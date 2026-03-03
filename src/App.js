import {useState, useEffect} from 'react'
import {CartProvider} from './context/CartContext'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishList from './components/DishList'
import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [restaurantData, setRestaurantData] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout for Node 16

        const response = await fetch(API_URL, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch menu data`)
        }

        const data = await response.json()

        if (!isMounted) return

        // Handle array response from API
        const restaurant =
          Array.isArray(data) && data.length > 0 ? data[0] : data

        if (!restaurant || !restaurant.table_menu_list) {
          throw new Error('Invalid data format received')
        }

        setRestaurantData(restaurant)

        // Set first category as active
        if (restaurant.table_menu_list.length > 0) {
          setActiveCategory(restaurant.table_menu_list[0].menu_category_id)
        }
      } catch (err) {
        if (isMounted) {
          if (err.name === 'AbortError') {
            setError('Request timeout - please check your connection')
          } else {
            setError(err.message || 'Failed to load menu')
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  const handleCategoryChange = categoryId => {
    setActiveCategory(categoryId)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const getActiveCategoryDishes = () => {
    if (!restaurantData?.table_menu_list || !activeCategory) return []
    const category = restaurantData.table_menu_list.find(
      cat => cat.menu_category_id === activeCategory,
    )
    return category?.category_dishes || []
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" role="status" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading menu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
          type="button"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="app">
        <Header
          restaurantName={restaurantData?.restaurant_name || 'Restaurant'}
        />

        <CategoryTabs
          categories={restaurantData?.table_menu_list || []}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        <main className="main-content">
          <DishList dishes={getActiveCategoryDishes()} />
        </main>
      </div>
    </CartProvider>
  )
}

export default App
