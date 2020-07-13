import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "../modules/common/pages/MainPage";
import LoginPage from "../modules/authentication/pages/LoginPage";


const isLoggedIn = () => {
  return localStorage.getItem("auth-user");
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/DashboardPage.vue"),
        meta: {requiresAuth: true}

      },
      {
        path: 'sales-contact',
        name: 'sales-contact',
        component: () => import(/* webpackChunkName: "ales-contact" */ "@/modules/sales-contact/pages/SalesContactPage.vue"),
        meta: {requiresAuth: true}

      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()){
    next({name: 'login'})
  }else {
    next();
  }
})

export default router
