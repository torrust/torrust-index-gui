import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authModalOpen: false,
        sideBarOpen: false,
        loggedIn: false,
        userToken: localStorage.getItem('userToken') || '',
        user: {},
    },
    getters: {
        isAuthenticationModalOpen: state => {
            return state.authModalOpen;
        },
        sideBarOpen: state => {
            return state.sideBarOpen;
        },
        isLoggedIn: state => {
            return state.loggedIn;
        },
    },
    mutations: {
        setAuthModal (state, opened) {
            state.authModalOpen = opened
        },
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        authSucces (state, token, user) {
            state.loggedIn = true;
            state.userToken = token;
            state.user = user;
        },
        logout(state) {
            state.loggedIn = false;
            state.token = '';
        }
    },
    actions: {
        closeAuthModal({commit}) {
            commit('setAuthModal', false);
            document.body.classList.remove("modal-open");
        },
        openAuthModal({commit}) {
            commit('setAuthModal', true);
            document.body.classList.add("modal-open");
        },
        toggleSidebar({commit}) {
            commit('toggleSidebar')
        },
    }
})
