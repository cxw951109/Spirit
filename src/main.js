// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import VueResource from 'vue-resource'


Vue.config.productionTip = false
Vue.prototype.$host = 'http://localhost:80/'
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://127.0.0.1:5000/chatroom',
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
