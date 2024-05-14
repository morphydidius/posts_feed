import profileApi from '@/api/profile';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

const getters = {};

export const mutationTypes = {
    getProfileStart: '[profile] getProfileStart',
    getProfileSuccess: '[profile] getProfileSuccess',
    getProfileFailure: '[profile] getProfileFailure',
};

const mutations = {
    [mutationTypes.getProfileStart]: (state) => {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getProfileSuccess]: (state, payload) => {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getProfileFailure]: (state) => {
        state.isLoading = false;
    }
};

export const actionTypes = {
    getUserProfile: '[profile] getProfile',
};

const actions = {
    [actionTypes.getUserProfile](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getProfileStart);

            profileApi.getUserProfile(slug)
                .then(profile => {
                    context.commit(mutationTypes.getProfileSuccess, profile);
                    resolve(profile);
                })
                .catch(() => {
                    context.commit(mutationTypes.getProfileFailure);
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
