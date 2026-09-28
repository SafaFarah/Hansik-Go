import { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking')
  const { token, setShowLogin } = useContext(StoreContext)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetryPayment = async () => {
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      setStatus('error')
      return
    }

    if (isRetrying) return
    setIsRetrying(true)

    try {
      // Create a new Stripe Checkout Session for the existing order
      const response = await api.post('/order/payment', {
        orderId
      })

      if (!response.data.sessionUrl) {
        toast.error('Unable to start payment. Please try again.')
        return
      }

      // Redirect to Stripe Checkout again
      window.location.href = response.data.sessionUrl
    } catch (error) {
      console.error('Retry payment error:', error)

      if (error.response?.status === 401) {
        setStatus('unauthorized')
        return
      }

      if (error.response?.status === 404) {
        setStatus('not-found')
        return
      }
      // Show the backend's message for known API errors
      toast.error(
        error.response?.data?.message ||
        'Unable to start payment. Please try again.'
      )
    } finally {
      setIsRetrying(false)
    }
  }

  useEffect(() => {
    let timeoutId
    let attempts = 0
    const maxAttempts = 10

    const verifyOrder = async () => {
      const orderId = searchParams.get('orderId')
      const success = searchParams.get('success')

      // Make sure the order ID exists
      if (!orderId) {
        setStatus('error')
        return
      }

      //  Customer cancelled Stripe Checkout
      if (success === 'false') {
        setStatus('cancelled')
        return
      }

      // Wait for the user to log in
      if (!token) {
        setStatus('unauthorized')
        return
      }

      setStatus('checking')

      try {
        // Ask the backend for the latest order status
        const response = await api.get(`/order/${orderId}`)

        // Payment confirmed by the Stripe webhook
        if (response.data.paymentStatus === 'paid') {
          setStatus('success')
          return
        }

        // Payment is still pending
        attempts += 1

        if (attempts < maxAttempts) {
          timeoutId = setTimeout(verifyOrder, 1000)
        } else {
          setStatus('pending')
        }

      } catch (error) {
        console.error('Error verifying order:', error)

        // Token is missing or expired
        if (error.response?.status === 401) {
          setStatus('unauthorized')
          return
        }

        toast.error(
          error.response?.data?.message ||
          'Unable to verify your order.'
        )

        setStatus('error')
      }
    }

    // Start checking the payment
    verifyOrder()

    // Clean up the timer
    return () => {
      clearTimeout(timeoutId)
    }

  }, [searchParams, token])



  if (status === 'checking') {
    return (
      <div className="verify">
        <h2>Checking your payment...</h2>
        <p>Please wait.</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="verify">
        <h2>Payment successful</h2>
        <p>Your order has been confirmed.</p>

        <button onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    )
  }

  if (status === 'cancelled') {
    return (
      <div className="verify">
        <h2>Payment cancelled</h2>
        <p>
          Your order is still waiting for payment.
        </p>
        <div className="actions">
          <button
            onClick={handleRetryPayment}
            disabled={isRetrying}
          >
            {isRetrying ? 'Loading...' : 'Pay Again'}
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate('/cart')}
          >
            Return to Cart
          </button>
        </div>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="verify">
        <h2>Payment is taking a little longer</h2>

        <p>
          Your payment may still be processing.
          You can check your order status later.
        </p>

        <div className="actions">
          <button onClick={() => navigate('/orders')}>
            View My Orders
          </button>

          <button
            className="secondary-btn"
            onClick={() => window.location.reload()}
          >
            Check Again
          </button>
        </div>
      </div>
    )
  }

  if (status === 'unauthorized') {
    return (
      <div className="verify">
        <h2>Please log in</h2>
        <p>
          Please log in to check your order status.
        </p>
        <button onClick={() => setShowLogin(true)}>
          Log In
        </button>
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="verify">
        <h2>Order not found</h2>
        <p>
          We couldn't find this order.
          Please check your orders.
        </p>

        <button onClick={() => navigate('/orders')}>
          View My Orders
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="verify">
        <h2>Something went wrong</h2>

        <p>
          We couldn't check your order right now.
          Please try again.
        </p>

        <div className="actions">
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate('/orders')}
          >
            View My Orders
          </button>
        </div>
      </div>
    )
  }
}

export default Verify