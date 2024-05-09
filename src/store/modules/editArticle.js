import { editArticle, getArticle } from '@/api/article';

const state = {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
    article: null,
};

export const mutationTypes = {
    getArticleStart: '[editArticle] getArticleStart',
    getArticleSuccess: '[editArticle] getArticleSuccess',
    getArticleFailure: '[editArticle] getArticleFailure',

    editArticleStart: '[editArticle] editArticleStart',
    editArticleSuccess: '[editArticle] editArticleSuccess',
    editArticleFailure: '[editArticle] editArticleFailure',
};

const mutations = {
    [mutationTypes.getArticleStart]: (state) => {
        state.isLoading = true;
        state.article = null;
    },
    [mutationTypes.getArticleSuccess]: (state, payload) => {
        state.isLoading = false;
        state.article = payload;
    },
    [mutationTypes.getArticleFailure]: (state) => {
        state.isLoading = false;
    },

    [mutationTypes.editArticleStart]: (state) => {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.editArticleSuccess]: (state, article) => {
        state.isSubmitting = false;
        state.article = article;
    },
    [mutationTypes.editArticleFailure]: (state, errors) => {
        state.isSubmitting = false;
        state.validationErrors = errors;
    },
};

export const actionTypes = {
    getArticle: '[editArticle] getArticle',
    editArticle: '[editArticle] editArticle',
};

const actions = {
    [actionTypes.getArticle](context, { slug }){
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
    [actionTypes.editArticle](context, { slug, articleFields }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.editArticleStart);

            editArticle(slug, articleFields)
                .then(article => {
                    context.commit(mutationTypes.editArticleSuccess);
                    resolve(article);
                })
                .catch(({ response }) => {
                    context.commit(mutationTypes.editArticleFailure, response.data.errors);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};