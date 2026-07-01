import React, { useContext } from 'react'
import './FoodItem.css'
import { MinusIcon, PlusIcon, StarIcon } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, image, price, description}) => {

    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-img' src={image} alt='' />
            {!cartItems[id]
                ?<div className='add-item' onClick={()=>addToCart(id)}><PlusIcon /></div>
                :<div className='food-item-counter'>
                    <div className='add' onClick={()=>addToCart(id)}><PlusIcon /></div>
                    <p>{cartItems[id]}</p>
                    <div className='minus' onClick={()=>removeFromCart(id)}><MinusIcon /></div>
                </div>
            }
        </div>
        <div className='food-item-info'>
            <p className='food-item-name'>{name}</p>
            <div className='rating-stars'>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem