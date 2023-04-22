import { axiosInstance, apiRequest } from './core/axios'

export const addPost = async (data) => {
    return await apiRequest(() => axiosInstance.post(`/post`, data))
}

export const getAllPosts = async (query = 'sort[created_at]=-1') => {
    return await apiRequest(() => axiosInstance.get(`/post?${query}`))
}

export const getMyPosts = async () => {
    return await apiRequest(() => axiosInstance.get(`/post/my`))
}

export const deletePost = async (id) => {
    return await apiRequest(() => axiosInstance.delete(`/post/${id}`))
}

export const likePost = async (id) => {
    return await apiRequest(() => axiosInstance.patch(`/post/${id}/like`))
}

