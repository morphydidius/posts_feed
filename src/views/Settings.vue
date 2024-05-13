<template>
	<div
		v-if="currentUser"
		class="settings-page"
	>
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Settings</h1>

					<pf-validation-errors
						v-if="validationErrors"
						:validation-errors="validationErrors"
					></pf-validation-errors>

					<form
						@submit.prevent="onSubmit"
					>
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="URL of profile picture"
									v-model="form.image"
								>
							</fieldset>

							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Username"
									v-model="form.username"
								>
							</fieldset>

							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									placeholder="Short bio"
									v-model="form.bio"
								></textarea>
							</fieldset>

							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Email"
									v-model="form.email"
								>
							</fieldset>

							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Type password"
									v-model="form.password"
								>
							</fieldset>

							<button
								:disabled="isSubmitting"
								type="submit"
								class="btn btn-lg btn-primary pull-xs-right"
							>Update settings</button>
						</fieldset>
					</form>

					<hr />

					<button
						@click="logout"
						class="btn btn-outline-danger"
						type="text"
					>Click here to logout</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
	getterTypes as authGetterTypes,
	actionTypes as authActionTypes,
} from '@/store/modules/auth';
import PfValidationErrors from '@/components/ValidationErrors';

export default {
	name: 'PfSettings',
	components: {
		PfValidationErrors,
	},
	data() {
		return {
			form: {
				username: '',
				bio: '',
				image: '',
				email: '',
				password: '',
			},
		}
	},
	computed: {
		...mapState({
			isSubmitting: state => state.settings.isSubmitting,
			validationErrors: state => state.settings.validationErrors,
		}),
		...mapGetters({
			currentUser: authGetterTypes.currentUser,
		})
	},
	mounted() {
		this.mergeUserData();
	},
	methods: {
		onSubmit() {
			this.$store.dispatch(authActionTypes.updateCurrentUser, this.form);
		},
		mergeUserData() {
			if (this.currentUser) {
				this.form.username = this.currentUser.username;
				this.form.bio = this.currentUser.bio;
				this.form.image = this.currentUser.image;
				this.form.email = this.currentUser.email;
			}
		},
		logout() {
			this.$store
				.dispatch(authActionTypes.logout)
				.then(() => {
					this.$router.push({ name: 'globalFeed' });
				});
		},
	},
	watch: {
		currentUser: {
			handler() {
				this.mergeUserData();
			},
		}
	}
};
</script>
