import { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'

const PlaceOrder = () => {

  const { getTotalCartAmount, setShowLogin } = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [pendingOrderId, setPendingOrderId] = useState(null)

  // Update the corresponding form field
  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    try {
      let orderId = pendingOrderId
      // Create the order only if we don't already have one
      if (!orderId) {
        const orderResponse = await api.post('/order/place', {
          address: data
        })
        orderId = orderResponse.data.orderId
        setPendingOrderId(orderId)
      }

      // Create a Stripe Checkout Session for this order
      const paymentResponse = await api.post('/order/payment', {
        orderId
      })

      // Redirect the customer to Stripe Checkout
      window.location.href = paymentResponse.data.sessionUrl
    } catch (error) {
      console.error('Checkout error:', error)
      if (error.response?.status === 401) {
        setShowLogin(true)
        return
      }
      toast.error(
        error.response?.data?.message ||
        'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='place-order' onSubmit={onSubmitHandler}>
      <section className='place-order-left'>
        <h1>Delivery Information</h1>
        <div className='multi-fields'>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        <div className='multi-fields'>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='multi-fields'>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip code"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </section>


      <section className="place-order-right">
        <div className="cart-summary">
          <h2>Cart Total</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${subtotal === 0 ? 0 : 5}</span>
          </div>
          <div className="summary-row total">
            <strong>Total</strong>
            <strong> ${subtotal === 0 ? 0 : (subtotal + 5).toFixed(2)}</strong>
          </div>
          <button
            className="checkout-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </section>
    </form>
  )
}

export default PlaceOrder