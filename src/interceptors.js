export const jwtToken = localStorage.getItem("authorization");
const axios = require('axios');
export const axiosApiInstance = axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Bearer ${jwtToken}`,
            'Accept': 'application/json',
        }
        console.log(jwtToken)
        return config;
    },
    error => {
        Promise.reject(error)
    }
    );

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    console.log(jwtToken)
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});