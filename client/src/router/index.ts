import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GenericUploads from '@/views/GenericUploads.vue'
import ImageToPDF from '@/views/ImageToPDF.vue'
import { preventButtonFocus } from '@/utils/prevent.buttonFocus'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Generic Uploads',
        meta: {
            title: 'Uploads'
        },
        component: GenericUploads
    },
    {
        path: '/pdf',
        name: 'PDF Creation',
        meta: {
            title: 'Create PDF'
        },
        component: ImageToPDF
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' | Sourzce'
    next()
})

export default router
