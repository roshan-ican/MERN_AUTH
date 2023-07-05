import axios from 'axios';
import Cookies from 'js-cookie';

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            Cookies.remove('accessToken');
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);


// user end points

export const userLogin = async (data) => {
    try {
        const response = await axios.post('http://localhost:3500/auth/login', data);
        const user = response.data;
        // Store the access token in the cookie
        window.localStorage.setItem('user', JSON.stringify(user));
        return response;
    } catch (error) {
        throw error;
    }
};


export const userSignUp = (data) => {
    return axios.post("http://localhost:3500/auth/signUp", data);
};


export const getUser = async () => {
    try {
        const user = window.localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        const response = await axios.get(`http://localhost:3500/users/${parsedUser._id}`, {
            headers: {
                authorization: `Bearer ${parsedUser.accessToken}`, // Include the access token in the request headers
            },
        });
        // Handle the response data
        return response.data; // Return the response data
    } catch (error) {
        if (error.response && error.response.status === 401) {

        }
    };

}