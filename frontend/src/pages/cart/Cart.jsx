import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom'
 

const Cart = () => {

  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <section className="cart">
      <h1 className="cart-heading">Your Order</h1>
      <div className="cart-content">
        <div className="cart-list">
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="cart-card">
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity">
                      {cartItems[item._id] === 1 ? (
                        <button className="delete-btn" onClick={() => removeFromCart(item._id)}>
                          <Trash2 />
                        </button>
                      ) : (
                        <button className="minus-btn" onClick={() => removeFromCart(item._id)}>-</button>
                      )}
                      <span>{cartItems[item._id]}</span>

                      <button className="plus-btn" onClick={() => addToCart(item._id)}>
                        +
                      </button>
                    </div>

                    <p className="item-total">
                      ${item.price * cartItems[item._id]}
                    </p>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotalCartAmount()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${getTotalCartAmount()=== 0?0:2}</span>
          </div>
          <div className="summary-row total">
            <strong>Total</strong>
            <strong> ${getTotalCartAmount()=== 0?0:getTotalCartAmount() + 2}</strong>
          </div>
          <div className="promo">
            <input type="text" placeholder="Promo Code" />
            <button>Apply</button>
          </div>
          <button className="checkout-btn" onClick={()=>navigate('/order')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart