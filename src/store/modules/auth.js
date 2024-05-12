import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous',
};

const getters = {
    [getterTypes.currentUser]: (state) => state.currentUser,
    [getterTypes.isLoggedIn]: (state) => !!state.isLoggedIn,
    [getterTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',
};

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true;
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false;
        state.currentUser = null;
        state.isLoggedIn = false;
    },

    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload;
    },
    [mutationTypes.updateCurrentUserFailure]() {}
};

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
}

const actions = {
    [actionTypes.register](context, data) {
        context.commit(mutationTypes.registerStart);

        return new Promise((resolve) => {
            authApi.register(data)
                .then(response => {
                    resolve(response.data.user);
                    context.commit(mutationTypes.registerSuccess, response.data.user);
                    setItem('accessToken', response.data.user.token);
                })
                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors);
                })
        });
    },

    [actionTypes.login](context, data) {
        context.commit(mutationTypes.loginStart);

        return new Promise((resolve) => {
            authApi.login(data)
                .then(response => {
                    resolve(response.data.user);
                    context.commit(mutationTypes.loginSuccess, response.data.user);
                    setItem('accessToken', response.data.user.token);
                })
                .catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors);
                })
        });
    },

    [actionTypes.getCurrentUser](context) {
        context.commit(mutationTypes.getCurrentUserStart);

        return new Promise((resolve) => {
            authApi.getCurrentUser()
                .then(response => {
                    resolve(response.data.user);
                    context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure);
                })
        });
    },

    [actionTypes.updateCurrentUser](context, userData) {
        context.commit(mutationTypes.updateCurrentUserStart);

        return new Promise((resolve) => {
            authApi.updateCurrentUser(userData)
                .then(user => {
                    resolve(user);
                    context.commit(mutationTypes.updateCurrentUserSuccess, user);
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.updateCurrentUserFailure,
                        result.response.data.errors,
                    );
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};