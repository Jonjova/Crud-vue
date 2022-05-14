import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListaTareas from '@/components/ListaTareas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ListaTareas',
      name: 'ListaTareas',
      component: ListaTareas
    }
  ]
})
