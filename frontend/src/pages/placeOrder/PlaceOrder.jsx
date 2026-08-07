import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className='place-order'>

      <section className='place-order-left'>
        <h1>Delivery Information</h1>
        <div className='multi-fields'>
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </section>


      <section className="place-order-right">
        <div className="cart-summary">
          <h2>Cart Total</h2>
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
          <button className="checkout-btn">
            Proceed to Payment
          </button>
        </div>
      </section>

    </form>
  )
}

export default PlaceOrder