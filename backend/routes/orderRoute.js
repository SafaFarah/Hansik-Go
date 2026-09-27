import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, createCheckoutSession } from '../controllers/orderController.js'

const orderRouter = express.Router()

// Create a new order
orderRouter.post('/place', authMiddleware, placeOrder)

// Create Stripe Checkout Session
orderRouter.post('/payment', authMiddleware, createCheckoutSession)

export default orderRouter