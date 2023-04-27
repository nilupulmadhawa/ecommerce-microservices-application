import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const OrderSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        items: [
            {
                type: Array,
                required: true,
            },
        ],
        total: {
            type: String,
            required: true
        },
        commission: {
            type: String,
            required: false
        },
        seller_profit: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false,
            enum: ['Pending', 'Accept', 'Reject', 'Cancel', 'Delivered', 'Completed'],
            default: 'Pending'
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

OrderSchema.plugin(aggregatePaginate)

OrderSchema.index({ createdAt: 1 })

const Order = mongoose.model('Order', OrderSchema)
Order.syncIndexes()

export default Order
