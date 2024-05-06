import axios from '@/api/axios';

export const getTags = () => {
    return axios.get('/tags').then(response => response.data.tags);
};
