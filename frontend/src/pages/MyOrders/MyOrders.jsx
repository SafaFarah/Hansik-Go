import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Package, CalendarDays, ShoppingBag, CreditCard, ReceiptText, Clock3, CircleCheck, Truck, XCircle, ClipboardList, LoaderCircle } from 'lucide-react'
import api from '../../services/api'
import './MyOrders.css'

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Get the logged-in user's orders
                const response = await api.get('/order/list')
                setOrders(response.data.orders)

            } catch (error) {
                console.error('Error fetching orders:', error)
                toast.error(
                    error.response?.data?.message ||
                    'Failed to load your orders.'
                )
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [])

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

    // Return an icon according to the order status
    const getOrderStatusIcon = (status) => {
        switch (status) {
            case 'processing':
                return <Clock3 size={16} />

            case 'out_for_delivery':
                return <Truck size={16} />

            case 'delivered':
                return <CircleCheck size={16} />

            case 'cancelled':
                return <XCircle size={16} />

            default:
                return <Clock3 size={16} />
        }
    }

    // Format status text for the customer
    const formatStatus = (status) => {
        return status.replaceAll('_', ' ')
    }

    // Loading state
    if (isLoading) {
        return (
            <main className="my-orders">
                <section className="orders-loading">
                    <LoaderCircle
                        className="loading-icon"
                        size={42}
                    />
                    <h2>Loading your orders...</h2>
                    <p>
                        Please wait while we retrieve your order history.
                    </p>
                </section>
            </main>
        )
    }

    // Empty state
    if (orders.length === 0) {
        return (
            <main className="my-orders">
                <section className="orders-empty">
                    <div className="empty-icon">
                        <ClipboardList size={48} />
                    </div>
                    <h2>No orders yet</h2>
                    <p>
                        You haven't placed any orders yet.
                    </p>
                </section>
            </main>
        )
    }

    return (
        <main className="my-orders">

            {/* Page header */}
            <section className="orders-page-header">

                <div className="page-title">
                    <div className="page-title-icon">
                        <Package size={42} />
                    </div>

                    <div>
                        <h1>My Orders</h1>
                        <p>
                            View and track your order history.
                        </p>
                    </div>
                </div>

                <div className="orders-count">
                    <strong>{orders.length}</strong>
                    <span>
                        {orders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                </div>

            </section>

            {/* Orders */}
            <section className="orders-list">
                {orders.map((order) => (
                    <article
                        className={`order-card ${order.orderStatus}`}
                        key={order._id}
                    >
                        {/* Order header */}
                        <header className="order-header">
                            <div className="order-info">
                                <div className="order-icon">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h2>
                                        Order #{order._id.slice(-8)}
                                    </h2>
                                    <div className="order-date">
                                        <CalendarDays size={15} />
                                        <span>
                                            {formatDate(order.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`order-status ${order.orderStatus}`}
                            >
                                {getOrderStatusIcon(order.orderStatus)}
                                <span>
                                    {formatStatus(order.orderStatus)}
                                </span>
                            </div>
                        </header>

                        {/* Ordered items */}
                        <div className="order-items-section">

                            <div className="section-heading">
                                <ShoppingBag size={18} />
                                <h3>Items</h3>
                            </div>

                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div
                                        className="order-item"
                                        key={item.foodId}
                                    >
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p>
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <span className="item-price">
                                            {formatPrice(
                                                item.priceCent *
                                                item.quantity
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Order summary */}
                        <footer className="order-footer">

                            <div className="order-summary-item">
                                <div className="summary-label">
                                    <CreditCard size={17} />
                                    <span>Payment:</span>
                                </div>

                                <strong
                                    className={`payment-status ${order.paymentStatus}`}
                                >
                                    {order.paymentStatus}
                                </strong>
                            </div>

                            <div className="order-summary-item">
                                <div className="summary-label">
                                    <ReceiptText size={17} />
                                    <span>Total: </span>
                                </div>
                                <strong className="order-total">
                                    {formatPrice(order.amountCent)}
                                </strong>
                            </div>
                        </footer>
                    </article>
                ))}
            </section>

        </main>
    )
}

export default MyOrders