import UserModel from '../models/userModel.js'
import FoodModel from '../models/FoodModel.js'
import OrderModel from '../models/orderModel.js'



const getAdminOrders = async (req, res) => {
    try {
        // Get all orders, newest first
        const orders = await OrderModel
            .find({})
            .select(
                '_id address.firstName address.lastName address.email address.phone items.name items.quantity amountCent paymentStatus orderStatus createdAt'
            )
            .sort({ createdAt: -1 })

        // Return only information needed by the admin list
        const formattedOrders = orders.map((order) => ({
            _id: order._id,

            customer: {
                name: `${order.address.firstName} ${order.address.lastName}`,
                email: order.address.email,
                phone: order.address.phone
            },

            items: order.items.map((item) => ({
                name: item.name,
                quantity: item.quantity
            })),

            amountCent: order.amountCent,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt
        }))

        // Send orders
        return res.status(200).json({
            success: true,
            orders: formattedOrders
        })
    } catch (error) {
        console.error('Error getting admin orders:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve orders.'
        })
    }
}

export { getAdminOrders }