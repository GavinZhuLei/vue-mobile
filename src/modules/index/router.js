import Vue from 'vue';
import Router from 'vue-router';
import Home from './page/Home.vue'
import Second from './page/Second.vue'
import Third from './page/Third.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
      children: [
        {
          path: 'second/',
          name: 'second',
          component: Second,
          children: [
            {
              path: 'third/',
              name: 'third',
              component: Third,
            }
          ]
        },
      ],
    },
  ],
})
