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
                        <pf-add-to-favourites
                            :is-favourited="Boolean(article.favourited)"
                            :article-slug="article.slug"
                            :favourites-count="article.favoritesCount"
                        ></pf-add-to-favourites>
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

                    <pf-tag-list :tags="article.tagList"></pf-tag-list>
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
import PfTagList from '@/components/TagList';
import PfAddToFavourites from '@/components/AddToFavourites';
import queryString from 'query-string';

export default {
    name: 'PfFeed',
    components: {
        PfTagList,
        PfPagination,
        PfLoader,
        PfErrorMessage,
        PfAddToFavourites,
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
        tagName() {
            return this.$route.params.slug || '';
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
        },
        tagName: {
            handler(value) {
                if (value) {
                    this.fetchFeed();
                }
            }
        }
    },
    mounted() {
        this.fetchFeed();
    },
    methods: {
        fetchFeed() {
            const parsedUrl = queryString.parseUrl(this.feedApiUrl);

            const params = {
                limit: this.limit,
                offset: this.offset,
                ...parsedUrl.query,
            };

            if (this.type === 'tags') {
                const chosenTag = this.$route.params.slug;

                if (chosenTag) {
                    params.tag = chosenTag;
                }
            }

            const stringifiedParams = queryString.stringify(params);

            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams,
            });
        },
    },
}
</script>