import './index.css'

const CategoryTabs = ({categories, activeCategory, onSelectCategory}) => (
  <div className="tabs-container">
    <div className="tabs-scroll">
      {categories.map(category => (
        <button
          key={category.menu_category_id}
          className={`tab-button ${
            activeCategory === category.menu_category_id ? 'active' : ''
          }`}
          onClick={() => onSelectCategory(category.menu_category_id)}
          type="button"
        >
          {category.menu_category}
        </button>
      ))}
    </div>
  </div>
)

export default CategoryTabs
