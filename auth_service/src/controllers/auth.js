import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { sendTokenResponse } from '../utils/jwt'

export const register = asyncHandler(async (req, res) => {
    try {
        if (!req.body.role) return makeResponse({ res, status: 400, message: 'Role is required' })
        if (req.body.role == 'admin') return makeResponse({ res, status: 400, message: 'Something went wrong' })
        const user = await User.find({ email: req.body.email });
        if (user.length > 0) return makeResponse({ res, status: 400, message: 'User already exists' })
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const result = (await new User(req.body).save()).toObject();
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to add User' })
        return makeResponse({ res, message: 'User added successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const login = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length == 0) return makeResponse({ res, status: 401, message: 'Invalid credentials' })
        const isMatch = await bcrypt.compare(req.body.password, user[0].password)
        if (!isMatch) return makeResponse({ res, status: 401, message: 'Invalid credentials' })
        return sendTokenResponse(res, user[0], 'User logged in successfully')
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})


export const logout = asyncHandler(async (req, res) => {
    try {
        return makeResponse({ res, message: 'User logged out successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const currentUser = asyncHandler(async (req, res) => {
    try {
        return makeResponse({ res, data: req.user })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})