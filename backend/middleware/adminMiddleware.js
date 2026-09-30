import UserModel from '../models/userModel.js'

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required.'
            })
        }

        next()
    } catch (error) {
        console.error('Admin authorization error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to verify admin access.'
        })
    }
}

export default adminMiddleware