import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, createCheckoutSession, getOrder, getUserOrders, cancelOrder } from '../controllers/orderController.js'
import { getAdminOrders} from '../controllers/adminOrderController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const orderRouter = express.Router()

// Create a new order
orderRouter.post('/place', authMiddleware, placeOrder)

// Create Stripe Checkout Session
orderRouter.post('/payment', authMiddleware, createCheckoutSession)

orderRouter.post('/cancel', authMiddleware, cancelOrder)

// Get orders belonging to the logged-in user
orderRouter.get('/list', authMiddleware, getUserOrders)

orderRouter.get('/admin/list', getAdminOrders)

orderRouter.get('/:orderId', authMiddleware, getOrder)

export default orderRouter