import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Introduction'
    },
    {
      path: '/Search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/Earth',
      name: 'Earth',
      component: () => import('../views/Earth.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: () => import('../views/UserInfo.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/Admin.vue')
    },
    {

      path: '/ScholarSearch',
      name: 'ScholarSearch',
      component: () => import('../views/ScholarSearch.vue')
    },
    {
      path: '/Introduction',
      name: 'Introduction',
      component: () => import('../views/Introduction/introduction.vue')
    },
    {
      path: '/senior',
      name: 'senior',
      component: () => import('../components/SeniorSearch.vue')
    },
    {
      path: '/workSearchList',
      name: 'workSearchList',
      component: () => import('../views/workSearchList.vue')
    },
    {
      path: '/scholarSearchList',
      name:'scholarSearchList',
      component: () => import('../views/ScholarSearchList.vue')
    },
    {
      path: '/displayPaper',
      name: 'DisplayPaper',
      component: () => import('../views/DisplayPaper.vue')
    },
    {
      path: '/RankList',
      name: 'RankList',
      component: () => import('../views/RankList.vue')
    },

    {
      path: '/Institution',
      name: 'Institution',
      component: () => import('../views/Institution/institution.vue')
    },
    {
      path: '/messageCenter',
      name: 'MessageCenter',
      component: () => import('../views/MessageCenter.vue')
    },
    {
      path: '/ScholarPage',
      name:'ScholarPage',
      component: () => import('../views/ScholarPage.vue')
    },
    {
      path: '/JournalPage',
      name:'JournalPage',
      component: () => import('../views/JournalPage.vue')
    },
    {
      path: '/DisplayItem',
      name:'DisplayItem',
      component: () => import('../views/DisplayItem.vue')
    }
  ]
})

export default router
