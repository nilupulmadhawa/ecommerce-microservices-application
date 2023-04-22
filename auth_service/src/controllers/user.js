import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'

export const create = asyncHandler(async (req, res) => {
    try {
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

export const getAll = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return makeResponse({ res, status: 200, data: users, message: 'User retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id }).select("-password");
        if (user.length == 0) return makeResponse({ res, status: 404, message: 'User Not found' })
        return makeResponse({ res, status: 200, data: user, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        if (user.length == 0) return makeResponse({ res, status: 404, message: 'User Not found' });
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update User' })
        return makeResponse({ res, status: 200, message: 'User updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        if (user.length == 0) return makeResponse({ res, status: 404, message: 'User Not found' });
        const result = await User.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete User' })
        return makeResponse({ res, status: 200, message: 'User deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

