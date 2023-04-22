import { axiosInstance, apiRequest } from './core/axios'

export const login = async (data) => {
    return await apiRequest(() => axiosInstance.post(`/auth/login`, data))
}

export const register = async (data) => {
    return await apiRequest(() => axiosInstance.post(`/auth/register`, data))
}

export const resetPassword = async (code, data) => {
    return await apiRequest(() => axiosInstance.post(`/auth/reset_password/${code}`, data))
}
