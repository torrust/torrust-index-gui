import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Layout from "@/components/Layout";
// import Home from "@/views/Home";

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: { name: 'Home' } },
  // { path: '/', component: Layout, children: [
  //     { path: 'home', name: 'Home', component: Home }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
