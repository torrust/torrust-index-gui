import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import '@/assets/css/tailwind.css'
import Layout from "@/components/Layout";
import Home from "@/views/Home";
import store from "@/store/index";


Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    timeSince(date) {
      const seconds = Math.floor((+new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        return `${interval} year${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hour${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} minute${(interval > 1 ? 's' : '')}`;
      }
      return `${Math.floor(seconds)} seconds`;
    },
    // get string of file size in bytes
    fileSize(size) {
      let sizeString = `${(size).toFixed(2)} B`;

      if (size / 1000000000 < 1000) sizeString = `${(size / 1000000000).toFixed(2)} GB`;
      if (size / 1000000 < 1000) sizeString = `${(size / 1000000).toFixed(2)} MB`;
      if (size / 1000 < 1000) sizeString = `${(size / 1000).toFixed(2)} KB`;

      return sizeString;
    },
  },
})

const routes = [
  { path: '/', redirect: { name: 'Home' } },
  { path: '/', component: Layout, children: [
      { path: 'home', name: 'Home', component: Home }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
