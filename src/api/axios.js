import axios from 'axios';
import { getItem } from '@/helpers/persistentStorage';

axios.defaults.baseURL = 'https://api.realworld.io/api';

axios.interceptors.request.use((config) => {
    const token = getItem('accessToken');
    const authorizationToken = token ? `Token ${token}` : '';
    config.headers.authorization = authorizationToken;

    return config;
});

export default axios;