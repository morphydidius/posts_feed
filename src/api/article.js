import axios from '@/api/axios';

export const getArticle = (articleName) => {
    return axios.get(`/articles/${articleName}`)
        .then(response => response.data.article);
};

export const createArticle = ({ body, description, tagList, title }) => {
    return axios.post('/articles', {
        article: {
            body,
            description,
            tagList,
            title,
        }
    })
};

export const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`);
};
