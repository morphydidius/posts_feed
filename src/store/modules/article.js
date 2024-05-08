import { getArticle } from '@/api/article';

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
    }
};

export const actionTypes = {
    getArticle: '[article] getArticle',
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
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};