import UserModel from '../models/userModel.js'
import FoodModel from '../models/FoodModel.js'
import OrderModel from '../models/orderModel.js'
import Stripe from 'stripe'
import stripe from '../config/stripe.js'


const placeOrder = async (req, res) => {

  try {
    const userId = req.userId
    const { address } = req.body

    // Validate the delivery address
    if (
      !address ||
      !address.firstName ||
      !address.lastName ||
      !address.email ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.country ||
      !address.phone
    ) {
      return res.status(400).json({
        success: false,
        message: 'Complete delivery address is required.'
      })
    }
    // Get the user's current cart
    const user = await UserModel
      .findById(userId)
      .select('cartData')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    const cartData = user.cartData || {}
    const foodIds = Object.keys(cartData)

    if (foodIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty.'
      })
    }

    // Get the current food information and prices from the database
    const foods = await FoodModel.find({
      _id: { $in: foodIds }
    })

    // every food item in the cart still exists
    if (foods.length !== foodIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Some items in your cart are no longer available.'
      })
    }
    // Build the order items and calculate the total
    const items = []
    let amountCent = 0

    for (const food of foods) {
      const quantity = cartData[food._id.toString()]

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Invalid cart quantity.'
        })
      }
      items.push({
        foodId: food._id,
        name: food.name,
        priceCent: food.priceCent,
        quantity
      })
      amountCent += food.priceCent * quantity
    }

    // Create the order with payment still pending
    const order = await OrderModel.create({
      userId,
      items,
      amountCent,
      address,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    })

    // Return the newly created order
    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      orderId: order._id
    })
  } catch (error) {
    console.error('Error placing order:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to place order.'
    })
  }
}


  const createCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.body
        const userId = req.userId

        //  Validate the order ID
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required.'
            })
        }

        // Find the order and it belongs to the logged-in user
        const order = await OrderModel.findOne({
            _id: orderId,
            userId
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found.'
            })
        }

        // the order has not already been paid
        if (order.paymentStatus === 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Order has already been paid.'
            })
        }

        // Convert order items into Stripe line items
        const lineItems = order.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.priceCent
            },
            quantity: item.quantity
        }))

        // Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            customer_email: order.address.email,
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
            metadata: {
                orderId: order._id.toString()
            }
        })

        //  Return the Stripe Checkout URL
        return res.status(200).json({
            success: true,
            sessionUrl: session.url
        })

    } catch (error) {
        console.error('Error creating Stripe Checkout Session:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to create payment session.'
        })
    }
}

const handleStripeWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature']

    let event

    try {
        // Verify that this webhook actually came from Stripe
        event = Stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error('Stripe webhook verification failed:', error.message)
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        // Handle successful Checkout payment
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            const orderId = session.metadata.orderId

            if (!orderId) {
                return res.status(400).json({
                    success: false,
                    message: 'Order ID is missing from Stripe session.'
                })
            }
            const order = await OrderModel.findById(orderId)
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found.'
                })
            }

            // Prevent processing the same successful payment twice
            if (order.paymentStatus === 'paid') {
                return res.status(200).json({
                    received: true
                })
            }

            // Mark the order as paid
            order.paymentStatus = 'paid'
            // Move the order into processing
            order.orderStatus = 'processing'
            await order.save()
            // Clear the user's cart only after successful payment
            await UserModel.findByIdAndUpdate(order.userId, {
                cartData: {}
            })
        }

        return res.status(200).json({
            received: true
        })

    } catch (error) {
        console.error('Error processing Stripe webhook:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to process Stripe webhook.'
        })
    }
}


const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const userId = req.userId

        // Find the order belonging to the logged-in user
        const order = await OrderModel.findOne({
            _id: orderId,
            userId
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found.'
            })
        }

        // Return only the information needed by the frontend
        return res.status(200).json({
            success: true,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus
        })

    } catch (error) {
        console.error('Error getting order:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve order.'
        })
    }
}


const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId

        // Get only the logged-in user's orders
        const orders = await OrderModel
            .find({ userId })
            .sort({ createdAt: -1 })

        // Return the orders
        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {
        console.error('Error getting user orders:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve orders.'
        })
    }
}

export { placeOrder, createCheckoutSession, handleStripeWebhook, getOrder, getUserOrders }