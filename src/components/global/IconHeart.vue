<template>
	<svg
		:height="height"
		:width="width"
		:fill="color"
		viewBox="0 0 512 512"
		class="icon-heart"
	>
		<path d="m256 448a32 32 0 0 1 -18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153 .63-62.11 50.46-112.63 111.08-112.63 44.08 0 74.61 24.83 92.39 45.51a6 6 0 0 0 9.06 0c17.78-20.7 48.31-45.51 92.39-45.51 60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 0 1 -18 5.56z" />
	</svg>
</template>

<script>
export default {
	name: 'PfIconHeart',
	props: {
		width: {
			type: [String, Number],
			default: 20,
		},
		height: {
			type: [String, Number],
			default: 20,
		},
		color: {
			type: String,
			default: 'black',
		},
	},
};
</script>

<style scoped>
.icon-heart {
	vertical-align: middle;
}
</style>