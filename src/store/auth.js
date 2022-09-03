import Vue from "vue";
import HttpService from "@/common/http-service";

const USER = {
    token: '',
    username: '',
    admin: false,
}

function getUserFromLocalStorage() {
    const user_encoded = localStorage.getItem('torrust_user');

    if (user_encoded && user_encoded !== "undefined") {
        return JSON.parse(user_encoded);
    }

    return { ...USER };
}



const initialState = {
    user: getUserFromLocalStorage()
};

export default {
    state: {
        authModalOpen: false,
        ...initialState
    },
    getters: {
        isAuthenticationModalOpen: state => {
            return state.authModalOpen;
        },
        isLoggedIn: state => {
            return !!(state.user.token && state.user.username);
        },
        isAdministrator: state => {
            return state.user.admin;
        },
        getToken: (state, getters) => {
            return getters.isLoggedIn ? state.user.token : '';
        },
    },
    mutations: {
        setAuthModal(state, opened) {
            state.authModalOpen = opened
        },
        setUser(state, data) {
            state.user = data;

            localStorage.setItem('torrust_user', JSON.stringify(state.user));
        },
        logout(state) {
            state.user = { ...USER }

            localStorage.removeItem('torrust_user');
        }
    },
    actions: {
        async login({dispatch, state, commit, getters}, data) {
            await HttpService.post('/user/login', data, async (res) => {
                const data = res.data.data;

                await commit('setUser', data);

                dispatch('closeAuthModal');

                Vue.notify({
                    title: 'Authentication',
                    text: 'You have successfully signed in!',
                    type: 'success',
                });
            });
        },
        register({}, data) {
            return new Promise((resolve) => HttpService.post('/user/register', data, () => {
                Vue.notify({
                    title: 'Authentication',
                    text: 'Account has been created!',
                    type: 'success',
                });

                resolve();
            }))
        },
        logout({commit}) {
            commit('logout');

            Vue.notify({
                title: 'Authentication',
                text: 'You have been logged out',
                type: 'info'
            });
        },
        async renewToken({dispatch, commit, state}) {
            if (!state.user.token) return;

            await HttpService.post('/user/token/renew', { token: state.user.token }, async (res) => {
                const data = res.data.data;

                await commit('setUser', data);
            })
                .catch(() => {
                    dispatch("logout");
                });
        },
    }
}
