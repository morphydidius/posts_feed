<template>
    <div>
        <nav class="navbar navbar-light">
            <div class="container">
                <router-link
                    class="navbar-brand"
                    :to="{ name: 'globalFeed' }"
                >posts feed</router-link>

                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'globalFeed' }"
                            active-class="active"
                            exact
                        >Home</router-link>
                    </li>

                    <template v-if="isLoggedIn">
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'createArticle' }"
                                active-class="active"
                            >
                                <i class="ion-compose"></i> &nbsp; New Article
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'settings' }"
                                active-class="active"
                            >
                                <i class="ion-gear-a"></i> &nbsp; Settings
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{
                                    name: 'userProfile',
                                    params: {
                                        slug: currentUser?.username,
                                    } }"
                                active-class="active"
                            >
                                <img :src="currentUser?.image" alt="#" class="user-pic">
                                &nbsp;
                                {{ currentUser?.username }}
                            </router-link>
                        </li>
                    </template>

                    <template v-if="isAnonymous">
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'login' }"
                                active-class="active"
                            >Sing in</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'registration' }"
                                active-class="active"
                            >Sing up</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';

export default {
    name: 'PfHeaderBar',
    computed: {
        ...mapGetters({
            currentUser: getterTypes.currentUser,
            isLoggedIn: getterTypes.isLoggedIn,
            isAnonymous: getterTypes.isAnonymous,
        }),
    },
}
</script>