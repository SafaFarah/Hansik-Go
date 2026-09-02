import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext)

  return (
    <section className='food-display' id='food-display'>
      <h2>Popular Korean Dishes</h2>
      <div className='food-display-list'>
        {food_list.map((item) => {
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} id={item._id} name={item.name} image={item.image} priceCent={item.priceCent} description={item.description}/>
          }        
        })}
      </div>
    </section>
  )
}

export default FoodDisplay