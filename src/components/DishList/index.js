import DishItem from '../DishItem'
import './index.css'

const DishList = ({dishes}) => {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes available in this category.</p>
      </div>
    )
  }

  return (
    <div className="dish-list">
      {dishes.map(dish => (
        <DishItem key={dish.dish_id} dish={dish} />
      ))}
    </div>
  )
}

export default DishList
