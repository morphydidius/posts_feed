<template>
    <div class="article-page">
        <div class="banner">
            <div
                v-if="article"
                class="container"
            >
                <h1>{{ article.title }}</h1>

                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'userProfile',
                            params: {
                                slug: article.author.username,
                            }
                        }"
                    >
                        <img :src="article.author.image" alt="#">
                    </router-link>

                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile',
                                params: {
                                    slug: article.author.username,
                                }
                            }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>

                        <span class="date">
                            {{ article.createdAt }}
                        </span>
                    </div>

                    <span v-if="isAuthor">
                        <router-link
                            :to="{
                                name: 'editArticle',
                                params: {
                                    slug: article.slug,
                                }
                            }"
                            class="btn btn-outline-secondary btn-sm mr-4"
                        >
                            <i class="ion-edit"></i>

                            <span>Edit Article</span>
                        </router-link>

                        <button
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteArticle"
                        >
                            <i class="ion-trash-a"></i>
                            <span>Delete Article</span>
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <div class="container page">
            <pf-loader v-if="isLoading" />

            <pf-error-message v-if="error" />

            <div
                v-if="article"
                class="row article-content"
            >
                <div class="col-xs-12">
                    <div>
                        <p>{{ article.body }}</p>
                    </div>
                    TAGLIST
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { actionTypes as articleActionTypes } from '@/store/modules/article';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import { mapState, mapGetters  } from 'vuex';
import PfLoader from '@/components/Loader';
import PfErrorMessage from '@/components/ErrorMessage';

export default {
    name: 'PfArticle',
    components: {
        PfErrorMessage,
        PfLoader,
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            article: state => state.article.data,
            error: state => state.article.error,
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser,
        }),
        isAuthor() {
            if (!this.article || !this.currentUser) {
                return false;
            }
            return this.article.author.username === this.currentUser.username;
        },
    },
    mounted() {
        this.$store.dispatch(articleActionTypes.getArticle, {
            slug: this.$route.params.slug,
        });
    },
    methods: {
        deleteArticle() {
            this.$store.dispatch(articleActionTypes.deleteArticle, {
                slug: this.article.slug,
            })
                .then(() => {
                    this.$router.push({ name: 'globalFeed' });
                });
        },
    },
};
</script>

<style scoped>
.mr-4 {
    margin-right: 4px;
}
</style>