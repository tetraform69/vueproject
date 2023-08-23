import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/user',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (User.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "User" */ '../views/UserView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        // route level code-splitting
        // this generates a separate chunk (Admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Admin" */ '../views/AdminView.vue')
    },
    {
        path: '/logout',
        name: 'logout',
        component: {
            beforeRouteEnter(to, from, next) {
                localStorage.clear()

                const destino = {
                    path: '/',
                }

                next(destino)
            }
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !localStorage.token){
        next({name: 'login'})
    }else{
        next()
    }
})

export default router
