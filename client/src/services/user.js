import { axiosInstance, apiRequest } from './core/axios'

export const updateUser = async (data) => {
    return await apiRequest(() => axiosInstance.patch(`/user/${data.id}`, data))
}

export const resetPassword = async (data) => {
    return await apiRequest(() => axiosInstance.put(`/user/password`, data))
}
