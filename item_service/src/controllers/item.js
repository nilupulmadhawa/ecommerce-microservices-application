import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import Item from '../models/item.model.js';
import sharp from 'sharp';
import crypto from 'crypto'
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

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
        if (item.length == 0) return makeResponse({ res, status: 404, message: 'Item Not Found' })
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


// Handler to retrieve items sold by a specific seller and populate category details
export const getSellerItems = asyncHandler(async (req, res) => {
    try {
        // Fetch items where 'seller_id' matches the provided ID and populate the 'category' field
        const items = await Item.find({ seller_id: req.params.id }).populate('category');
        
        // Check if no items were found
        if (items.length === 0) {
            return makeResponse({ 
                res, 
                status: 404, 
                message: 'Items not found' 
            });
        }
        
        // Check if any items are missing their associated category
        const itemsWithMissingCategories = items.some(item => !item.category);
        if (itemsWithMissingCategories) {
            return makeResponse({ 
                res, 
                status: 404, 
                message: 'Category not found for one or more items' 
            });
        }

        // Prepare items data to include category details
        const preparedItems = items.map(item => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            category_id: item.category ? item.category._id : null, // Safely access category ID
            category: item.category ? item.category.category : 'No category', // Example to handle category name
            image: item.image,
            status: item.status
        }));

        // Return response with the prepared items data
        return makeResponse({ 
            res, 
            status: 200, 
            data: preparedItems, 
            message: 'Items retrieved successfully' 
        });
    } catch (error) {
        // Handle any server errors
        return makeResponse({ 
            res, 
            status: 500, 
            message: error.message 
        });
    }
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const uploadFile = asyncHandler(async (req, res) => {
    const file = req.file 
    const image = req.body.name

    const fileBuffer = sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

    // Configure the upload details to send to S3
    const fileName = generateFileName()
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: file.mimetype
    }

    // Send the upload to S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Save the image name to the database. Any other req.body data can be saved here too but we don't need any other image data.
    const post = await prisma.posts.create({
        data: {
        image,
        }
    })

    res.send(post)
});

export const getProductImage = asyncHandler(async (req, res) => {

    const posts = await prisma.posts.findMany({ orderBy: [{ created: 'desc' }] }) // Get all posts from the database
  
    for (let post of posts) { // For each post, generate a signed URL and save it to the post object
      post.imageUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: imageName
        }),
        { expiresIn: 60 }// 60 seconds
      )
    }
  
    res.send(posts)
  });

  export const deleteProductImage = asyncHandler(async (req, res) => {

    const id = +req.params.id
    const post = await prisma.posts.findUnique({where: {id}}) 
  
    const deleteParams = {
      Bucket: bucketName,
      Key: post.imageName,
    }
  
    return s3Client.send(new DeleteObjectCommand(deleteParams))
  
    await prisma.posts.delete({where: {id}})
    res.send(post)
  });