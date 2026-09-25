import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
        name: { type: String, required: true },
        priceCent: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    amountCent: { type: Number, required: true },
    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true }
    },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'], default: 'pending'
    }
  },
  { timestamps: true }
)

const OrderModel = mongoose.model.order || mongoose.model('order', orderSchema)

export default OrderModel