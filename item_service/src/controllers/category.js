import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import Category from '../models/category.model.js';
import bcrypt from 'bcrypt'

export const create = asyncHandler(async (req, res) => {
    try {
        const result = (await new Category(req.body).save()).toObject();
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to add Category' })
        return makeResponse({ res, message: 'Category added successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({ status: "active" });
        return makeResponse({ res, status: 200, data: categories, message: 'Category retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ _id: req.params.id });
        if (category.length == 0) return makeResponse({ res, status: 404, message: 'Category Not found' })
        return makeResponse({ res, status: 200, data: category, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ _id: req.params.id })
        if (category.length == 0) return makeResponse({ res, status: 404, message: 'Category Not found' });
        const result = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update Category' })
        return makeResponse({ res, status: 200, message: 'Category updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ _id: req.params.id })
        if (category.length == 0) return makeResponse({ res, status: 404, message: 'Category Not found' });
        const result = await Category.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete Category' })
        return makeResponse({ res, status: 200, message: 'Category deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getSellerCategories = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ seller_id: req.params.id });
        if (category.length == 0) return makeResponse({ res, status: 404, message: 'Category Not found' })
        return makeResponse({ res, status: 200, data: category, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

// get status active all categories
export const getActiveCategories = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ seller_id: req.params.id, status: "active" });
        if (category.length == 0) return makeResponse({ res, status: 404, message: 'Category Not found' })
        return makeResponse({ res, status: 200, data: category, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})