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

                    <router-link
                        :to="{
                            name: 'editArticle',
                            params: {
                                slug: article.slug,
                            }
                        }"
                        class="btn btn-outline-secondary btn-sm"
                    >
                        <i class="ion-edit"></i>

                        <span>Edit Article</span>
                    </router-link>

                    <button class="btn btn-outline-danger btn-sm">
                        <i class="ion-trash-a"></i>
                        <span>Delete Article</span>
                    </button>
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
import { actionTypes } from '@/store/modules/article';
import { mapState } from 'vuex';
import PfLoader from '@/components/Loader'
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
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug,
        });
    },
};
</script>