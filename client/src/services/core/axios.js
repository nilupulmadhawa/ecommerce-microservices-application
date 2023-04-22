import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "/api"
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

export const apiRequest = async (request) => {
    const response = await request()
        .then((res) => ({
            ...res.data,
            success: true,
        }))
        .catch((error) => {
            const message = error.response.data.message
            return {
                success: false,
                message: message,
                error: error.response
            }
        })
    return response
}
