import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        
        // Nasta3mlou regex walla n-thabbtou ken el URL mouch mel auth routes
        // Bechi ma nab3athouch el token fel login/register (mouch lezem)
        const authRoutes = ['/users/login/', '/users/register/'];
        const isAuthRequest = authRoutes.some(route => config.url.endsWith(route) || config.url.includes(route));

        if (token && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
            // Debug sghir bech ta3ref el token khraj walla lé
            console.log(`[API] Token sent to: ${config.url}`);
        } else {
            console.log(`[API] No token for: ${config.url}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Zid hathi bech ta3mel auto-logout ken el token wfet (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expiré ou invalide. Redirection...");
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_slug');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;