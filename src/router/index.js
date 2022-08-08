import { createRouter, createWebHistory } from 'vue-router'

const constantRoutes = [
    
    { 
        path: '/:alias', 
        props: true,
        component: () => import('@/components/redirect')
    },
    {
        path: '/',
        props:true,
        component: () => import('@/components/urlShortenerForm'),
    },
    {
        path: '/result',
        props: true,
        component: () => import('@/components/output'),
    },
]

const createRouterFunction = () =>
    createRouter({
        history: createWebHistory(),
        routes: constantRoutes,
    })

const router = createRouterFunction()

export function resetRouter() {
    const newRouter = createRouterFunction()
    router.matcher = newRouter.matcher // reset router
}

export default router
