import axios from "axios";
import Vue from "vue";
import store from "@/store";

export default new class {
    constructor() {
        axios.interceptors.response.use(undefined, (err) => {
            if (err.status === 401) {
                store.commit('logout');
                Vue.notify({
                    title: 'Authentication',
                    text: 'Your session has expired.',
                    type: 'warn',
                });
            }
        });
    }

    setToken() {
        const token = store.state.auth.userToken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    get(url, callback) {
        return axios.get(url).then(callback).catch(this.errorHandler);
    }

    // for downloading files
    getBlob(url, callback) {
        this.setToken();

        return axios.get(url, { responseType: 'blob' }).then(callback).catch(this.errorHandler);
    }

    post(url, data, callback) {
        this.setToken();

        return axios.post(url, data).then(callback).catch(this.errorHandler);
    }

    errorHandler(error) {
        if (!error.response) {
            console.error('Cannot connect to backend');
            Vue.notify({
                title: 'Server error',
                text: 'Cannot connect to the server, please try again later.',
                type: 'error',
            });
            return;
        }

        const res = error.response;
        console.error(res.data.error);
        Vue.notify({
            title: 'Authentication',
            text: res.data.error,
            type: 'error',
        });
    }
}
