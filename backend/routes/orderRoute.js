import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, createCheckoutSession, getOrder, getUserOrders } from '../controllers/orderController.js'

const orderRouter = express.Router()

// Create a new order
orderRouter.post('/place', authMiddleware, placeOrder)

// Create Stripe Checkout Session
orderRouter.post('/payment', authMiddleware, createCheckoutSession)

// Get orders belonging to the logged-in user
orderRouter.get('/list', authMiddleware, getUserOrders)

orderRouter.get('/:orderId', authMiddleware, getOrder)

export default orderRouter