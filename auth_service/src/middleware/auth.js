import { decodeJwtToken } from '../utils/jwt'
import { makeResponse } from '../utils/response'
import asyncHandler from './async'
import User from '../models/user.model'

export const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization ? (req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1]?.replace('null', '')?.replace('undefined', '') : null) : null
        if (!token) return makeResponse({ res, status: 403, message: 'Unauthorized' })
        const decodedUser = decodeJwtToken(token).data
        const user = decodedUser ? await User.find({ _id: decodedUser._id }).select("-password") : null
        if (!user) return makeResponse({ res, status: 403, message: 'Unauthorized' })
        req.user = user
        next()
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }

})

export const userProtect = asyncHandler(async (req, res, next) => {
    if (req.user._id != req.params.id) return makeResponse({ res, status: 401, message: 'Unauthorized' })
    next()
})

