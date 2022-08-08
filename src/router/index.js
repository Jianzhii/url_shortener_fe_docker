import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
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
    { 
        path: '/:alias', 
        props: true,
        component: () => import('@/components/redirect')
    },
]

const createRouterFunction = () =>
    createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes,
    })

const router = createRouterFunction()

export function resetRouter() {
    const newRouter = createRouterFunction()
    router.matcher = newRouter.matcher // reset router
}

export default router
