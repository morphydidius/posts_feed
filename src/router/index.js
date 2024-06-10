import { createRouter, createWebHashHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import UserFeed from '@/views/UserFeed';
import TagsFeed from '@/views/TagsFeed';
import PostRegistration from '@/views/Registration';
import PostLogin from '@/views/Login';
import Article from '@/views/Article';
import CreateArticle from '@/views/CreateArticle';
import EditArticle from '@/views/EditArticle';
import Settings from '@/views/Settings';
import UserProfile from '@/views/UserProfile';

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
        component: CreateArticle,
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: Article,
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: EditArticle,
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
        component: Settings,
    },
    {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: UserProfile,
    },
    {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: UserProfile,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
