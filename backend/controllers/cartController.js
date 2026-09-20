import UserModel from "../models/userModel.js";
import FoodModel from "../models/FoodModel.js"

// Add food to cart
const addToCart = async (req, res) => {
  try {
    const { foodId } = req.body
    const userId = req.userId

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: 'Food ID is required.'
      })
    }
    const food = await FoodModel.findById(foodId)
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.'
      })
    }

    const user = await UserModel.findByIdAndUpdate(
      userId, { $inc: { [`cartData.${foodId}`]: 1 } })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Food added to cart.'
    })
  } catch (error) {
    console.error('Error adding food to cart:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to add food to cart.'
    })
  }
}


// Remove food from cart
const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.body
    const userId = req.userId

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: 'Food ID is required.'
      })
    }

    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    const quantity = user.cartData?.[foodId]
    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: 'Food item is not in the cart.'
      })
    }

    if (quantity > 1) {
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { [`cartData.${foodId}`]: -1 }
      })
    } else {
      await UserModel.findByIdAndUpdate(userId, {
        $unset: { [`cartData.${foodId}`]: '' }
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Food removed from cart.'
    })
  } catch (error) {
    console.error('Error removing food from cart:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to remove food from cart.'
    })
  }
}

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId

    const user = await UserModel
      .findById(userId)
      .select('cartData')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }
    return res.status(200).json({
      success: true,
      cartData: user.cartData || {}
    })
  } catch (error) {
    console.error('Error getting cart:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart.'
    })
  }
}

export { addToCart, removeFromCart, getCart }