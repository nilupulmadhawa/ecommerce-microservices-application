import { Joi } from 'celebrate'

export const addDeviceSchema = Joi.object({
    location_id: Joi.string().hex().length(24).required(),
    serial_number: Joi.string().required(),
    type: Joi.string().required().valid('pos', 'kisko', 'signage'),
    image: Joi.string(),
    is_active: Joi.boolean().required(),
})

export const deviceViewSchema = {
    filter: Joi.object()
        .keys({
            created_at: Joi.string().hex().length(24).optional(),
            location_id: Joi.string().hex().length(24).optional(),
            updated_at: Joi.string().hex().length(24).optional()
        })
        .optional(),
    sort: Joi.object()
        .keys({
            created_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
            updated_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional()
        })
        .optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional()
}

export const deviceIdSchema = {
    id: Joi.string().hex().length(24).required()
}