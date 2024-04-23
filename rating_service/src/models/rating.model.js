import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const RatingSchema = new mongoose.Schema(
    {
        buyer_id: {
            type: String,
            required: true
        },
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: false
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

RatingSchema.plugin(aggregatePaginate)

RatingSchema.index({ createdAt: 1 })

const Rating = mongoose.model('Rating', RatingSchema)
Rating.syncIndexes()

export default Rating
