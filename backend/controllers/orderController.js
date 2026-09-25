import UserModel from '../models/userModel.js'
import FoodModel from '../models/FoodModel.js'
import OrderModel from '../models/orderModel.js'


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

export { placeOrder }