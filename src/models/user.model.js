import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
 
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mobile_number: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false,
            enum: ['admin', 'buyer', 'seller'],
            default: 'user'
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

UserSchema.plugin(aggregatePaginate)

UserSchema.index({ createdAt: 1 })

const User = mongoose.model('User', UserSchema)
User.syncIndexes()

export default User
