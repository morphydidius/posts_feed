<template>
    <div class="sidebar">
        <p>Popular Tags</p>

        <div v-if="isLoading">Loading...</div>
        <div v-if="error">Error</div>

        <div v-if="tags" class="taglist">
            <router-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                    name: 'tag',
                    params: {
                        slug: tag,
                    },
                }"
                class="tag-default tag-pill"
            >
                {{ tag }}
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/tags';

export default {
    name: 'PfTags',
    components: {},
    computed: {
        ...mapState({
            isLoading: state => state.tags.isLoading,
            tags: state => state.tags.data,
            error: state => state.tags.error,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getTags);
    }
}
</script>