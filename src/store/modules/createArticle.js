import { createArticle } from '@/api/article';

const state = {
    isSubmitting: false,
    validationErrors: null,
};

export const mutationTypes = {
    createArticleStart: '[createArticle] createArticleStart',
    createArticleSuccess: '[createArticle] createArticleSuccess',
    createArticleFailure: '[createArticle] createArticleFailure',
};

const mutations = {
    [mutationTypes.createArticleStart]: (state) => {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.createArticleSuccess]: (state) => {
        state.isSubmitting = false;
    },
    [mutationTypes.createArticleFailure]: (state, errors) => {
        state.isSubmitting = false;
        state.validationErrors = errors;
    },
};

export const actionTypes = {
    createArticle: '[createArticle] createArticle',
};

const actions = {
    [actionTypes.createArticle](context, articleFields) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart);

            createArticle(articleFields)
                .then(article => {
                    context.commit(mutationTypes.createArticleSuccess);
                    resolve(article);
                })
                .catch(({ response }) => {
                    context.commit(mutationTypes.createArticleFailure, response.data.errors);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};