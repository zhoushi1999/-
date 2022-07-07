import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
import MyIcon from '@/components/MyIcon.vue'
// import '@/styles/reset.less'
import '@/styles/index.less'
import * as obj from '@/filters/index'
import FollowUser from '@/components/FollowUser.vue'
import '@/components/index'
Vue.component(FollowUser.name, FollowUser)
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Object.keys(obj).forEach(key => { Vue.filter(key, obj[key]) })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
