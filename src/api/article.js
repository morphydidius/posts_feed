import axios from '@/api/axios';

export const getArticle = (articleName) => {
    return axios.get(`/articles/${articleName}`)
        .then(response => response.data.article);
};
