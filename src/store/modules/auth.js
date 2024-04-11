import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

const mutations = {
    registerStart(state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },

    registerSuccess(state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },

    registerFail(state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    }
};

const actions = {
    register(context, data) {
        context.commit('registerStart');

        return new Promise((resolve) => {
            authApi.register(data)
                .then(response => {
                    resolve(response.data.user);
                    context.commit('registerSuccess', response.data.user);
                    setItem('accessToken', response.data.user.token);
                })
                .catch(result => {
                    context.commit('registerFail', result.response.data.errors);
                })
        });
    }
};

export default {
    state,
    mutations,
    actions,
};