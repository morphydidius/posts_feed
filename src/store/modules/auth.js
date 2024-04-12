import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',
    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',
};

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
}

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
    }
};

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
};

export default {
    state,
    mutations,
    actions,
};