import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import feed from '@/store/modules/feed';
import tags from '@/store/modules/tags';
import article from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle';
import editArticle from '@/store/modules/editArticle';
import settings from '@/store/modules/settings';
import favourites from '@/store/modules/favourites';
import profile from '@/store/modules/profile';

export default createStore({
    state: {},
    getters: {},
    actions: {},
    modules: {
        auth,
        feed,
        tags,
        article,
        createArticle,
        editArticle,
        settings,
        favourites,
        profile,
    },
});
