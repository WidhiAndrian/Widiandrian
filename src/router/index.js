import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Projects from '@/pages/Projects.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/projects', name: 'projects', component: Projects },
        { path: '/about', name: 'about', component: About },
        { path: '/contact', name: 'contact', component: Contact },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior() { return { top: 0 } },
})

export default router