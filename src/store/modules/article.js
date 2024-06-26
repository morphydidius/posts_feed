import { deleteArticle, getArticle } from '@/api/article';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

const getters = {

};

export const mutationTypes = {
    getArticleStart: '[article] getArticleStart',
    getArticleSuccess: '[article] getArticleSuccess',
    getArticleFailure: '[article] getArticleFailure',

    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
    deleteArticleFailure: '[article] deleteArticleFailure',
};

const mutations = {
    [mutationTypes.getArticleStart]: (state) => {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getArticleSuccess]: (state, payload) => {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getArticleFailure]: (state) => {
        state.isLoading = false;
    },

    [mutationTypes.deleteArticleStart]: () => {},
    [mutationTypes.deleteArticleSuccess]: (state) => {
        state.data = null;
    },
    [mutationTypes.deleteArticleFailure]: () => {},
};

export const actionTypes = {
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle',
};

const actions = {
    [actionTypes.getArticle](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart);
            getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article);
                    resolve(article);
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure);
                });
        });
    },
    [actionTypes.deleteArticle](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticleStart);
            deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSuccess);
                    resolve();
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteArticleFailure);
                })
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};