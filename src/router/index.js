import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import UserFeed from '@/views/UserFeed';
import TagsFeed from '@/views/TagsFeed';
import PostRegistration from '@/views/Registration';
import PostLogin from '@/views/Login';

const routes = [
    {
        path: '/',
        name: 'globalFeed',
        component: GlobalFeed,
    },
    {
        path: '/feed',
        name: 'userFeed',
        component: UserFeed,
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: TagsFeed,
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: GlobalFeed,
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: GlobalFeed,
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: GlobalFeed,
    },
    {
        path: '/login',
        name: 'login',
        component: PostLogin,
    },
    {
        path: '/registration',
        name: 'registration',
        component: PostRegistration,
    },
    {
        path: '/settings',
        name: 'settings',
        component: PostLogin,
    },
    {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: PostLogin,
    },
    {
        path: '/profiles/:slug/favourites',
        name: 'userProfileFavourites',
        component: PostLogin,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
