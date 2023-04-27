import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const ItemSchema = new mongoose.Schema(
    {
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        catagory: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false,
            enum: ['active', 'inactive'],
            default: 'active'
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

ItemSchema.plugin(aggregatePaginate)

ItemSchema.index({ createdAt: 1 })

const Item = mongoose.model('Item', ItemSchema)
Item.syncIndexes()

export default Item
