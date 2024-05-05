<template>
    <div class="home-page">
        <div>BANNER</div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <pf-feed type="global"></pf-feed>
                </div>

                <div class="col-md-3">
                    TAGS
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PfFeed from '@/components/Feed';

export default {
    name: 'PfGlobalFeed',
    components: { PfFeed },
    computed: {},
}
</script>