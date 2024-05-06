import { getTags } from '@/api/tags';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

const getters = {

};

export const mutationTypes = {
    getTagsStart: '[tags] getTagsStart',
    getTagsSuccess: '[tags] getTagsSuccess',
    getTagsFailure: '[tags] getTagsFailure',
};

const mutations = {
    [mutationTypes.getTagsStart]: (state) => {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getTagsSuccess]: (state, payload) => {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getTagsFailure]: (state) => {
        state.isLoading = false;
    }
};

export const actionTypes = {
    getTags: '[tags] getTags',
};

const actions = {
    [actionTypes.getTags](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getTagsStart);
            getTags()
                .then(tags => {
                    context.commit(mutationTypes.getTagsSuccess, tags);
                    resolve(tags);
                })
                .catch(() => {
                    context.commit(mutationTypes.getTagsFailure);
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