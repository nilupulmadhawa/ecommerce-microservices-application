import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
 
const CategorySchema = new mongoose.Schema(
    {
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: false
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

CategorySchema.plugin(aggregatePaginate)

CategorySchema.index({ createdAt: 1 })

const Category = mongoose.model('Category', CategorySchema)
Category.syncIndexes()

export default Category
