<template>
	<button
		@click.prevent="handleClick"
		class="btn btn-sm"
		:class="{
			'btn-primary': isFavouritedState,
			'btn-outline-primary': !isFavouritedState,
		}"
	>
		<pf-icon-heart
			:width="16"
			:height="16"
			:color="iconColor"
		/>

		<span>&nbsp;{{ favouritesCountState }}</span>
	</button>
</template>

<script>
import { actionTypes } from '@/store/modules/favourites';


export default {
	name: 'PfAddToFavourites',
	data() {
		return {
			isFavouritedState: this.isFavourited,
			favouritesCountState: Number(this.favouritesCount),
		};
	},
	props: {
		isFavourited: {
			type: Boolean,
			default: false,
		},
		articleSlug: {
			type: String,
			required: true,
		},
		favouritesCount: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		iconColor() {
			return this.isFavouritedState ? '#ffffff' : '#5CB85C';
		},
	},
	methods: {
		handleClick() {
			this.$store.dispatch(actionTypes.addToFavourites, {
				slug: this.articleSlug,
				isFavourited: this.isFavouritedState,
			});

			if (this.isFavouritedState) {
				this.favouritesCountState -= 1;
			} else {
				this.favouritesCountState += 1;
			}

			this.isFavouritedState = !this.isFavouritedState;
		},
	},
};
</script>