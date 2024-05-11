import { createRouter, createWebHistory } from 'vue-router'
import homePage from '@/views/homePage.vue'
import detailPage from '@/views/detailPage.vue'
import searchPage from '@/views/searchPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', redirect:'/home'},
    {path:'/home', component:homePage},
    {path:'/detail', component:detailPage},
    {path:'/search',component:searchPage},
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

export default router
