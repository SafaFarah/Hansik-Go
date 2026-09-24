import { useContext } from 'react'
import './FoodItem.css'
import { MinusIcon, PlusIcon, StarIcon } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, image, priceCent, description }) => {

    const { cartItems, addToCart, removeFromCart, requireAuth } = useContext(StoreContext);

    return (
        <article className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-img' src={`${import.meta.env.VITE_SERVER_URL}/images/${image}`} alt={name} />
                {!cartItems[id]
                    ? <div className='add-item' onClick={() => {
                        if (!requireAuth()) return
                        addToCart(id)
                    }}>
                        <PlusIcon />
                    </div>
                    : <div className='food-item-counter'>
                        <div className='add' onClick={() => {
                            if (!requireAuth()) return
                            addToCart(id)
                        }}>
                            <PlusIcon />
                        </div>
                        <p>{cartItems[id]}</p>
                        <div className='minus' onClick={() => {
                            if (!requireAuth()) return
                            removeFromCart(id)
                        }}>
                            <MinusIcon />
                        </div>
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
                <p className='food-item-price'>${(priceCent / 100).toFixed(2)}</p>
            </div>
        </article>
    )
}

export default FoodItem