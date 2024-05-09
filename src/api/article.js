import axios from '@/api/axios';

export const getArticle = (articleName) => {
    return axios.get(`/articles/${articleName}`)
        .then(response => response.data.article);
};

export const createArticle = articleFields => {
    return axios
        .post('/articles', {
            article: articleFields,
        })
        .then(response => response.data.article);
};

export const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`);
};
