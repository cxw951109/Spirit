import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cam from '@/components/Cam'
import container from '@/components/container'
import History from '@/components/History'
import cam_check from '@/components/cam_check'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cam',
      name: 'container',
      component: container,
      children:[
        {
          path:'/cam',
          name:'Cam',
          component:Cam
        },{
          path:'/history',
          name:'History',
          component: History
        },
        {
          path:'/cam_check',
          name:'cam_check',
          component: cam_check
        }
        ]
    }
  ]
})
