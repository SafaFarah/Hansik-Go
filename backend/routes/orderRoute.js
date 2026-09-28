import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, createCheckoutSession, getOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()

// Create a new order
orderRouter.post('/place', authMiddleware, placeOrder)

// Create Stripe Checkout Session
orderRouter.post('/payment', authMiddleware, createCheckoutSession)

orderRouter.get('/:orderId', authMiddleware, getOrder)

export default orderRouter