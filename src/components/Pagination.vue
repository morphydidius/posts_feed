<template>
    <ul class="pagination">
        <li
            v-for="(page, index) in pageCells"
            :key="index"
            class="page-item"
            :class="{
                active: index + 1 === currentPage,
            }"
        >
            <router-link
                :to="{
                    path: url,
                    query: {
                        page: page,
                    }
                }"
                class="page-link"
            >
                {{ page }}
            </router-link>
        </li>
    </ul>
</template>

<script>
import { range } from '@/helpers/utils';

export default {
    name: 'PfPagination',
    props: {
        total: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    computed: {
        pagesCount() {
            return Math.ceil(this.total / this.limit);
        },
        pageCells() {
            return range(1, this.pagesCount);
        },
    },
}
</script>
