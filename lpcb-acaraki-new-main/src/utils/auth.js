import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance for API calls
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const currentToken = localStorage.getItem('authToken');
            if (!currentToken) {
                return Promise.reject(error);
            }

            const refreshed = await refreshAuthToken();
            
            if (refreshed) {
                const newToken = localStorage.getItem('authToken');
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } else {
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/member')) {
                    window.location.href = '/member';
                }
                
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

// Authentication functions
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Login failed',
            errors: error.response?.data?.errors || {}
        };
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Registration failed',
            errors: error.response?.data?.errors || {}
        };
    }
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Logout API call failed:', error);
    } finally {
        localStorage.removeItem('authToken');
    }
};

export const checkAuthToken = async (token) => {
    try {
        const checkApi = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const response = await checkApi.get('/auth/me');
        return response.status === 200;
    } catch (error) {
        console.error('Check auth token error', error);
        
        if (error.response?.status === 401) {
            return false;
        }
        
        return false;
    }
};

export const refreshAuthToken = async () => {
    try {
        const refreshApi = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        const currentToken = localStorage.getItem('authToken');
        if (currentToken) {
            refreshApi.defaults.headers.Authorization = `Bearer ${currentToken}`;
        }
        
        const response = await refreshApi.post('/auth/refresh');
        if (response.data.access_token) {
            localStorage.setItem('authToken', response.data.access_token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Token refresh failed:', error);
        
        localStorage.removeItem('authToken');
        return false;
    }
};

export const getMemberProfile = async () => {
    try {
        const response = await api.get('/member/profile');
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch profile'
        };
    }
};

export const getMemberEventHistory = async () => {
    try {
        const response = await api.get('/member/activities');
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch event history'
        };
    }
};

export const checkInWithQRCode = async (qrcode) => {
    try {
        const response = await api.post('/member/check-in', { qr_code: qrcode });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Check-in failed',
            status: error.response?.status
        };
    }
};

export default api;
