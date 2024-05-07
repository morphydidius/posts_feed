<template>
    <div class="sidebar">
        <p>Popular Tags</p>

        <pf-loader v-if="isLoading" />

        <pf-error-message v-if="error" />

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
import PfLoader from '@/components/Loader';
import PfErrorMessage from '@/components/ErrorMessage';

export default {
    name: 'PfTags',
    components: {
        PfLoader,
        PfErrorMessage,
    },
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