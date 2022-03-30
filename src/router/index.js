import Vue from 'vue'
import VueRouter from 'vue-router'

//import HomeView from '@/views/HomeView.vue'
import store from "../store"
const beforeAuth = isAuth => (from, to, next) => {
  const isAuthenticated = store.getters["isAuthenticated"]
  if ((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {


    return next()
  } else {

    // 홈 화면으로 이동
    next({name :'login',params : {'login':'required'}})
  }
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Main.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/MainDetail.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/todo',
    name: 'todo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/TodoView.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Signup.vue'),
    beforeEnter: beforeAuth(false),
  }
]



const router = new VueRouter({
  mode : 'history',
  routes
})

router.beforeEach((to,from , next)=>{
  console.log("라우터 변경 !",to)
  to.matched.som
  next()
})

export default router
