import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Cart from '../views/Cart/Cart.vue'
import Category from '../views/Category/Category.vue'
import Profile from '../views/Profile/Profile.vue'
import Detail from 'views/detail/detail.vue'

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/detail/:iid',
        name: 'Detail',
        component: Detail

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router