<template>
    <div>
        <div v-if="isLoading">Loading...</div>

        <div v-if="error">Error :(</div>

        <div v-if="feed">
            <div
                 v-for="(article, index) in feed.articles"
                 :key="index"
                 class="article-preview"
            >
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

                    <div class="pull-xs-right">
                        ADD TO FAVOURITES
                    </div>
                </div>

                <router-link
                    :to="{
                        name: 'article',
                        params: {
                            slug: article.slug,
                        }
                    }"
                    class="preview-link"
                >
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                </router-link>
            </div>
            PAGINATION
        </div>
    </div>
</template>

<script>
import feedApiUrls from '@/maps/feedApiUrls';
import { actionTypes } from '@/store/modules/feed';
import { mapState } from 'vuex';

export default {
    name: 'PfFeed',
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error,
        }),
        feedApiUrl() {
            return feedApiUrls[this.type] || feedApiUrls['global'];
        },
    },
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, {
            apiUrl: this.feedApiUrl,
        });
    },
}
</script>