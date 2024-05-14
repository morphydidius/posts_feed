import axios from '@/api/axios';

const getApiUrl = slug => {
	return slug.length ? `/articles/${slug}/favorite` : '';
};

const addToFavourites = (slug) => {
	return axios.post(getApiUrl(slug), {})
		.then(response => response.data.article);
};

const removeFromFavourites = (slug) => {
	return axios.delete(getApiUrl(slug))
		.then(response => response.data.article);
};

export default {
	addToFavourites,
	removeFromFavourites,
};
