<template>
	<div>
		<pf-loader v-if="isLoading"></pf-loader>

		<div
			v-if="userProfile"
			class="profile-page"
		>
			<div class="user-info">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-md-10 offset-md-1">
							<img
								:src="userProfile.image"
								alt="userImage"
								class="user-img"
							>

							<h4>{{ userProfile.username }}</h4>

							<p>{{ userProfile.bio }}</p>

							<div>
								Follow USER Button

								<router-link
									v-if="isCurrentUserProfile"
									:to="{ name: 'settings' }"
									class="btn btn-sm btn btn-outline-secondary action-btn"
								>Edit Profile Settings</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<div class="article-toggle">
							<ul class="nav nav-pills outline-active">
								<li class="nav-item">
									<router-link
										:to="{
											name: 'userProfile',
											params: {
												slug: userProfile.username,
											},
										}"
										class="nav-link"
										:class="{
											active: routerName === 'userProfile',
										}"
									>My posts</router-link>
								</li>

								<li class="nav-item">
									<router-link
										:to="{
											name: 'userProfileFavorites',
											params: {
												slug: userProfile.username,
											},
										}"
										class="nav-link"
										:class="{
											active: routerName === 'userProfileFavorites',
										}"
									>Favorite Posts</router-link>
								</li>
							</ul>
						</div>

						<pf-feed type="profile"></pf-feed>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { actionTypes as profileActionTypes } from '@/store/modules/profile';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import PfFeed from '@/components/Feed';
import PfLoader from '@/components/Loader';

export default {
	name: 'PfUserProfile',
	components: {
		PfFeed,
		PfLoader,
	},
	computed: {
		...mapState({
			isLoading: state => state.profile.isLoading,
			userProfile: state => state.profile.data,
			error: state => state.profile.error,
		}),
		...mapGetters({
			currentUser: authGetterTypes.currentUser,
		}),
		isCurrentUserProfile() {
			if (!this.currentUser || !this.userProfile) {
				return false;
			}

			return this.currentUser.username === this.userProfile.username;
		},
		routerName() {
			return this.$route.name;
		},
	},
	mounted() {
		this.getUserProfile();
	},
	watch: {
		'$route.params.slug': {
			handler() {
				this.getUserProfile();
			},
		},
	},
	methods: {
		getUserProfile() {
			this.$store.dispatch(profileActionTypes.getUserProfile, {
				slug: this.$route.params.slug,
			});
		},
	},
};
</script>