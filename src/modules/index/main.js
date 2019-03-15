import Cookies from 'js-cookie'
import App from './App.vue';
import Bootstrap from '../../utils/bootstrap'
import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  // if (to.name !== 'login') {
  //   const token = Cookies.get('token')
  //   if (!token) {
  //     next('/login')
  //   }

  // }
  next()
})

Bootstrap.init(App, router, store)
