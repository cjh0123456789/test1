import { createRouter, createWebHistory } from 'vue-router'
import {  getUserId } from '@/utils/storage'
import homePage from '@/views/homePage.vue'
import detailPage from '@/views/detailPage.vue'
import searchPage from '@/views/searchPage.vue'
import loginPage from '@/views/login/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {path:'/', redirect:'/home'},
    {path:'/home', component:homePage},
    {path:'/detail/:id', component:detailPage},
    {path:'/search',component:searchPage},
    {path:'/login',component:loginPage},
    {
      path:'/person',component:() => import('@/views/person/personPage.vue'),
      redirect: '/person/upload',
      children:[
        {
          path:'/person/upload',component:() => import('@/views/person/uploadVideo.vue')
        },
        {
          path:'/person/manage',component:() => import('@/views/person/manageVideo.vue')
        }
      ]
    }
  ]
})
router.beforeEach(async (to) => {
  const userid = getUserId()
  if (!userid && to.path === '/person/upload') {
    return '/login'
  }
})

export default router
