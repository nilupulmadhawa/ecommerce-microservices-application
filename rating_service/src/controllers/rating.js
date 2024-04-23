import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import Rating from '../models/rating.model.js';
import bcrypt from 'bcrypt'

export const create = asyncHandler(async (req, res) => {
    try {
        const result = (await new Rating(req.body).save()).toObject();
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to add Rating' })
        return makeResponse({ res, message: 'Rating added successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const ratings = await Rating.find();
        return makeResponse({ res, status: 200, data: ratings, message: 'Rating retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const rating = await Rating.find({ _id: req.params.id });
        if (rating.length == 0) return makeResponse({ res, status: 404, message: 'Rating Not found' })
        return makeResponse({ res, status: 200, data: rating, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const rating = await Rating.find({ _id: req.params.id })
        if (rating.length == 0) return makeResponse({ res, status: 404, message: 'Rating Not found' });
        const result = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update Rating' })
        return makeResponse({ res, status: 200, message: 'Rating updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const rating = await Rating.deleteOne({ _id: req.params.id })
        return makeResponse({ res, status: 200, message: 'Rating deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getRatingByItemId = asyncHandler(async (req, res) => {
    try {
        const rating = await Rating.find({ item_id: req.params.id });
        if (rating.length == 0) return makeResponse({ res, status: 404, message: 'Rating Not found' })
        return makeResponse({ res, status: 200, data: rating, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})


export const getRatingByBuyerId = asyncHandler(async (req, res) => {
    try {
        const rating = await Rating.find({ buyer_id: req.params.id });
        if (rating.length == 0) return makeResponse({ res, status: 404, message: 'Rating Not found' })
        return makeResponse({ res, status: 200, data: rating, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

