<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <li
                v-if="isLoggedIn"
                class="nav-item"
            >
                <router-link
                    :to="{ name: 'userFeed' }"
                    class="nav-link"
                    :class="{ 'active': isUserFeed }"
                >
                    Your Feed
                </router-link>
            </li>

            <li class="nav-item">
                <router-link
                    :to="{ name: 'globalFeed' }"
                    class="nav-link"
                    :class="{ 'active': isGlobalFeed }"
                >
                    Global Feed
                </router-link>
            </li>

            <li
                v-if="tagName"
                class="nav-item"
            >
                <router-link
                    :to="{ name: 'tag', slug: tagName }"
                    class="nav-link"
                    :class="{ 'active': isTagFeed }"
                >
                    {{ tagName }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';

export default {
    name: "PfFeedNavigation",
    computed: {
        ...mapGetters({
            isLoggedIn: getterTypes.isLoggedIn
        }),
        isTagPage() {
            return this.$route.name === 'tag';
        },
        tagName() {
            return this.isTagPage && this.$route.params.slug
                ? `#${this.$route.params.slug}`
                : '';
        },
        isUserFeed() {
            return this.$route.name === 'userFeed';
        },
        isGlobalFeed() {
            return this.$route.name === 'globalFeed';
        },
        isTagFeed() {
            return this.$route.name === 'tag';
        },
    },
}
</script>