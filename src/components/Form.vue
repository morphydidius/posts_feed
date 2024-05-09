<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <pf-validation-errors
                        v-if="validationErrors"
                        :validation-errors="validationErrors"
                    />

                    <form
                        @submit.prevent="onSubmit"
                    >
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Article title"
                                    v-model="form.title"
                                >
                            </fieldset>

                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="What is your article about?"
                                    v-model="form.description"
                                >
                            </fieldset>

                            <fieldset class="form-group">
                                <textarea
                                    class="form-control form-control-lg"
                                    placeholder="Write your article"
                                    v-model="form.body"
                                ></textarea>
                            </fieldset>

                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Tags"
                                    v-model="form.tagList"
                                >
                            </fieldset>

                            <fieldset class="form-group">
                                <button
                                    :disabled="isSubmitting"
                                    class="btn btn-lg pull-xs-right btn-primary"
                                >
                                    {{ buttonText }}
                                </button>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PfValidationErrors from '@/components/ValidationErrors';
import { actionTypes } from '@/store/modules/createArticle';

export default {
    name: 'PfArticleForm',
    components: {
        PfValidationErrors,
    },
    data() {
        return {
            form: {
                title: '',
                description: '',
                body: '',
                tagList: '',
            },
        };
    },
    props: {
        type: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState({
            validationErrors: state => state.createArticle.validationErrors,
            isSubmitting: state => state.createArticle.isSubmitting,
        }),
        isNew() {
            return this.type === 'new';
        },
        buttonText() {
            return this.isNew ? 'Publish article' : 'Submit';
        },
    },
    methods: {
        onSubmit() {
            const form = {
                ...this.form,
                tagList: this.form.tagList.length
                    ? this.form.tagList.split(' ')
                    : [],
            };

            if (this.isNew) {
                this.$store.dispatch(actionTypes.createArticle, form)
                    .then(article => {
                        this.$router.push({
                            name: 'article',
                            params: {
                                slug: article.slug
                            }
                        });
                    });
            }
        },
    }
}
</script>