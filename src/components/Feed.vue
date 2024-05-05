<template>
    <div>Feed {{ feedApiUrl }} {{ type }}</div>
</template>

<script>
import feedApiUrls from '@/maps/feedApiUrls';
import { actionTypes } from '@/store/modules/feed';

export default {
    name: 'PfFeed',
    computed: {
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