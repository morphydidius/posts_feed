<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <pf-loader v-if="isLoading"></pf-loader>

                    <pf-validation-errors
                        v-if="validationErrors"
                        :validation-errors="validationErrors"
                    />

                    <form
                        v-if="!isLoading"
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
import PfLoader from '@/components/Loader';
import { actionTypes as createActionTypes } from '@/store/modules/createArticle';
import { actionTypes as editActionTypes } from '@/store/modules/editArticle';

export default {
    name: 'PfArticleForm',
    components: {
        PfLoader,
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
        isEdit() {
            return this.type === 'edit';
        },
        isNew() {
            return this.type === 'new';
        },
        buttonText() {
            return this.isNew ? 'Publish article' : 'Submit';
        },
        ...mapState({
            validationErrors(state) {
                switch(this.type) {
                    case 'new':
                        return state.createArticle.validationErrors;
                    case 'edit':
                        return state.editArticle.validationErrors;
                    case 'settings':
                        return null;
                }
                // return this.isNew
                //     ? state.createArticle.validationErrors
                //     : state.editArticle.validationErrors;
            },
            isSubmitting(state) {
                switch(this.type) {
                    case 'new':
                        return state.createArticle.isSubmitting;
                    case 'edit':
                        return state.editArticle.isSubmitting;
                    case 'settings':
                        return null;
                }

                // return this.isNew
                //     ? state.createArticle.isSubmitting
                //     : state.editArticle.isSubmitting;
            },
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
        }),
    },
    mounted() {
        if (this.isEdit) {
            this.$store.dispatch(editActionTypes.getArticle, {
                slug: this.$route.params.slug,
            })
                .then(article => {
                    this.mergeArticleFields(article);
                });
        }
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
                this.$store.dispatch(createActionTypes.createArticle, form)
                    .then(article => {
                        this.$router.push({
                            name: 'article',
                            params: {
                                slug: article.slug
                            }
                        });
                    });
            } else if (this.isEdit) {
                this.$store.dispatch(editActionTypes.editArticle, {
                    slug: this.article.slug,
                    articleFields: form,
                })
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
        mergeArticleFields({ title, description, body, tagList }) {
            this.form.title = title;
            this.form.description = description;
            this.form.body = body;
            this.form.tagList = tagList.length ? tagList.join(' ') : '';
        },
    },
}
</script>