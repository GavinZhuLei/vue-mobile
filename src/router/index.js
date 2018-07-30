import Vue from 'vue'
import Router from 'vue-router'

import A from '../page/a.vue'
import B from '../page/b.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'a',
      component: A,
      meta: {
        title: 'A'
      },
      children: [
        {
          path: 'b/',
          name: 'b',
          component: B,
          meta: {
            title: 'B'
          }
        }
      ]
    }
  ]
})
