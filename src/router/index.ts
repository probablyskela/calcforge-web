import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFoundView.vue')
    } ,
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      props: true
    },
    {
      path: '/calculators',
      name: 'calculators',
      component: () => import('../views/CalculatorsView.vue')
    },
    {
      path: '/create-calculator',
      name: 'create-calculator',
      component: () => import('../views/CalculatorCreateView.vue')
    },
    {
      path: '/calculators/:id',
      name: 'calculator',
      component: () => import('../views/CalculatorView.vue'),
      props: true
    },
    {
      path: '/calculators/:id/edit',
      name: 'calculator-edit',
      component: () => import('../views/CalculatorEditView.vue'),
      props: true
    }
  ]
})

export default router
