import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import Order from '../models/order.model.js';
import bcrypt from 'bcrypt'

export const create = asyncHandler(async (req, res) => {
    try {
        const result = (await new Order(req.body).save()).toObject();
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to add Order' })
        return makeResponse({ res, message: 'Order added successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        return makeResponse({ res, status: 200, data: orders, message: 'Order retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ _id: req.params.id });
        if (order.length == 0) return makeResponse({ res, status: 404, message: 'Order Not found' })
        return makeResponse({ res, status: 200, data: order, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ _id: req.params.id })
        if (order.length == 0) return makeResponse({ res, status: 404, message: 'Order Not found' });
        const result = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update Order' })
        return makeResponse({ res, status: 200, message: 'Order updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ _id: req.params.id })
        if (order.length == 0) return makeResponse({ res, status: 404, message: 'Order Not found' });
        const result = await Order.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete Order' })
        return makeResponse({ res, status: 200, message: 'Order deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})


export const getBuyerOrders = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ buyer_id: req.params.id });
        if (order.length == 0) return makeResponse({ res, status: 404, message: 'Order Not found' })
        return makeResponse({ res, status: 200, data: order, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getSellerOrders = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ seller_id: req.params.id });
        if (order.length == 0) return makeResponse({ res, status: 404, message: 'Order Not found' })
        return makeResponse({ res, status: 200, data: order, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})