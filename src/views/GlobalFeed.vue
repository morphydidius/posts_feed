<template>
    <div class="home-page">
        <pf-banner />

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <pf-feed-navigation />

                    <pf-feed type="global"></pf-feed>
                </div>

                <div class="col-md-3">
                    <pf-tags />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PfFeed from '@/components/Feed';
import PfTags from '@/components/Tags';
import PfBanner from '@/components/Banner';
import PfFeedNavigation from '@/components/FeedNavigation';

export default {
    name: 'PfGlobalFeed',
    components: {
        PfFeed,
        PfTags,
        PfBanner,
        PfFeedNavigation,
    },
}
</script>