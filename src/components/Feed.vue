<template>
    <div>
        <pf-loader v-if="isLoading" />

        <pf-error-message v-if="error" />

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

            <pf-pagination
                :total="feed.articlesCount"
                :limit="limit"
                :current-page="currentPage"
                :url="baseUrl"
            ></pf-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { feedApiUrls, postsPerPage } from '@/constants/feed';
import { actionTypes } from '@/store/modules/feed';
import PfPagination from '@/components/Pagination';
import PfLoader from '@/components/Loader';
import PfErrorMessage from '@/components/ErrorMessage';
import queryString from 'query-string';

export default {
    name: 'PfFeed',
    components: {
        PfPagination,
        PfLoader,
        PfErrorMessage,
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error,
        }),
        feedApiUrl() {
            return feedApiUrls[this.type] || feedApiUrls['global'];
        },
        limit() {
            return postsPerPage;
        },
        currentPage() {
            return Number(this.$route.query.page || '1');
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currentPage * this.limit - this.limit;
        },
    },
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    watch: {
        currentPage: {
            handler() {
                this.fetchFeed();
            },
        }
    },
    mounted() {
        this.fetchFeed();
    },
    methods: {
        fetchFeed() {
            const parsedUrl = queryString.parseUrl(this.feedApiUrl);

            const stringifiedParams = queryString.stringify({
                limit: this.limit,
                offset: this.offset,
                ...parsedUrl.query,
            });

            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams,
            });
        },
    }
}
</script>