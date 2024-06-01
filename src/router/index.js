import { createRouter, createWebHistory } from 'vue-router'
import {  getUserId } from '@/utils/storage'
import homePage from '@/views/homePage.vue'
import detailPage from '@/views/detailPage.vue'
import searchPage from '@/views/searchPage.vue'
import loginPage from '@/views/login/LoginPage.vue'

import managerLogin from '@/views/manager/managerLogin.vue'
import managerRegister from '@/views/manager/managerRegister.vue'
import reportForm from '@/views/manager/reportForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {path:'/', redirect:'/home'},
    {path:'/home', component:homePage},
    {path:'/detail/:id', component:detailPage},
    {path:'/search',component:searchPage},
    {path:'/userlogin',component:loginPage},

    {path:'/login',  name: 'login',component:managerLogin},
    {path:'/register', component:managerRegister},
    {path:'/r',name: 'audit', component:reportForm },

    {
      path:'/person',component:() => import('@/views/person/personPage.vue'),
      redirect: '/person/upload',
      children:[
        {
          path:'/person/upload',component:() => import('@/views/person/uploadVideo.vue')
        },
        {
          path:'/person/manage',component:() => import('@/views/person/manageVideo.vue')
        },
        {
          path:'/person/history',component:() => import('@/views/person/historyRecord.vue')
        },
        {
          path:'/person/message',component:() => import('@/views/person/messagePage.vue')
        }

      ]
    },

    {
      path:'/manager',name: 'info',component:() => import('@/views/manager/managerPage.vue'),
      redirect: '/manager/info',
      children:[
        {
          path:'/manager/info',component:() => import('@/views/manager/managerInfo.vue')
        },
        {
          path:'/manager/change',component:() => import('@/views/manager/infoChange.vue')
        },
        {
          path:'/manager/reprot',component:() => import('@/views/manager/reportHandle.vue')
        },
        {
          path:'/manager/charter',component:() => import('@/views/manager/charter.vue')
        },
        {
          path:'/manager/accountAduit',component:() => import('@/views/manager/accountAduit.vue')
        }
        
     
      ]
    }

    
  ]
})
router.beforeEach(async (to) => {
  const userid = getUserId()
  if (!userid && to.path === '/person/upload') {
    return '/userlogin'
  }
})

export default router
