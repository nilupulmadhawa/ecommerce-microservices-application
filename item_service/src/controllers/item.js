import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import Item from '../models/item.model.js';
import bcrypt from 'bcrypt'

export const create = asyncHandler(async (req, res) => {
    try {
        const result = (await new Item(req.body).save()).toObject();
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to add Item' })
        return makeResponse({ res, message: 'Item added successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message })
    }

})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const items = await Item.find({ status: "active" });
        return makeResponse({ res, status: 200, data: items, message: 'Item retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id });
        if (item.length == 0) return makeResponse({ res, status: 404, message: 'Item Not found' })
        return makeResponse({ res, status: 200, data: item, message: 'Device retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        if (item.length == 0) return makeResponse({ res, status: 404, message: 'Item Not found' });
        const result = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update Item' })
        return makeResponse({ res, status: 200, message: 'Item updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        if (item.length == 0) return makeResponse({ res, status: 404, message: 'Item Not found' });
        const result = await Item.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete Item' })
        return makeResponse({ res, status: 200, message: 'Item deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getSellerItems = asyncHandler(async (req, res) => {
    try {
        // Assuming 'category' is a reference in your Item schema
        const items = await Item.find({ seller_id: req.params.id }).populate('category');
        
        if (items.length === 0) {
            return makeResponse({ res, status: 404, message: 'Items not found' });
        }
        
        // Check if any of the items have a category not found (i.e., null)
        const itemsWithMissingCategories = items.some(item => !item.category);
        if (itemsWithMissingCategories) {
            return makeResponse({ res, status: 404, message: 'Category not found for one or more items' });
        }

        return makeResponse({ res, status: 200, data: items, message: 'Items retrieved successfully' });
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
});
