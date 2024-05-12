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
								>
							</fieldset>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import PfValidationErrors from '@/components/ValidationErrors';

export default {
	name: 'PfSettings',
	components: {
		PfValidationErrors,
	},
	computed: {
		...mapState({
			validationErrors: state => state.settings.validationErrors,
		}),
		...mapGetters({
			currentUser: authGetterTypes.currentUser,
		})
	},
	methods: {
		onSubmit() {
			console.log('submit');
		},
	}
};
</script>
