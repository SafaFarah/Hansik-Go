import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './Orders.css'
import { LoaderCircle, ClipboardList } from 'lucide-react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get orders for the admin
        const response = await api.get('/order/admin/list')

        if (response.data.success) {
          setOrders(response.data.orders)
        } else {
          toast.error(
            response.data.message || 'Failed to load orders.'
          )
        }
      } catch (error) {
        console.error('Error fetching admin orders:', error)
        toast.error(
          error.response?.data?.message ||
          'Failed to load orders.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') {
      return true
    }

    if (activeFilter === 'active') {
      return (
        order.paymentStatus === 'paid' &&
        ['processing', 'out_for_delivery'].includes(order.orderStatus)
      )
    }

    if (activeFilter === 'pending_payment') {
      return order.paymentStatus === 'pending'
    }

    if (activeFilter === 'delivered') {
      return order.orderStatus === 'delivered'
    }

    if (activeFilter === 'cancelled') {
      return order.orderStatus === 'cancelled'
    }

    return true
  })

  // Format cents as a USD price
  const formatPrice = (priceCent) => {
    return `$${(priceCent / 100).toFixed(2)}`
  }

  // Format the order date clearly
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="orders-loading">
        <LoaderCircle
          className="loading-icon"
          size={42}
        />
        <h2>Orders</h2>
        <p>Loading orders...</p>
      </div>
    )
  }
  // Empty state
  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="empty-icon">
          <ClipboardList size={48} />
        </div>
        <h2>No orders yet</h2>
        <p>
          There are no orders in the system yet.
        </p>
      </div>
    )
  }

  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className="order-filters">
        <button
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>

        <button
          className={activeFilter === 'active' ? 'active' : ''}
          onClick={() => setActiveFilter('active')}
        >
          Active
        </button>

        <button
          className={activeFilter === 'pending_payment' ? 'active' : ''}
          onClick={() => setActiveFilter('pending_payment')}
        >
          Pending Payment
        </button>

        <button
          className={activeFilter === 'delivered' ? 'active' : ''}
          onClick={() => setActiveFilter('delivered')}
        >
          Delivered
        </button>

        <button
          className={activeFilter === 'cancelled' ? 'active' : ''}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>
      {filteredOrders.length === 0 ? (
        <div className="orders-empty filtered-empty">
          <div className="empty-icon">
            <ClipboardList size={48} />
          </div>
          <h2>No matching orders</h2>
          <p>
            There are no orders in this filter.
          </p>
          <button
            className="clear-filter-btn"
            onClick={() => setActiveFilter('all')}
          >
            View All Orders
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <strong>
                    Order #{order._id.slice(-8)}
                  </strong>
                  <p>
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className={`order-status ${order.orderStatus}`}>
                  {order.orderStatus.replaceAll('_', ' ')}
                </span>
              </div>

              <div className="order-customer">
                <strong>{order.customer.name}</strong>
                <p>{order.customer.phone}</p>
                <p>{order.customer.email}</p>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              <div className="order-payment">
                <span>
                  Payment:
                  <strong
                    className={`payment-status ${order.paymentStatus}`}
                  >
                    {order.paymentStatus}
                  </strong>
                </span>

                <strong>
                  {formatPrice(order.amountCent)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Orders