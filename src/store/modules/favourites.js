import favouritesApi from '@/api/favourites';

export const mutationTypes = {
	addToFavouritesStart: '[favourites] addToFavourites start',
	addToFavouritesSuccess: '[favourites] addToFavourites success',
	addToFavouritesFailure: '[favourites] addToFavourites failure',
};

const mutations = {
	[mutationTypes.addToFavouritesStart]() {},
	[mutationTypes.addToFavouritesSuccess]() {},
	[mutationTypes.addToFavouritesFailure]() {},
};

export const actionTypes = {
	addToFavourites: '[favourites] addToFavourites',
};

const actions = {
	[actionTypes.addToFavourites](context, {
		slug,
		isFavourited,
	}) {
		return new Promise(resolve => {
			context.commit(mutationTypes.addToFavouritesStart);

			const promiseAction = isFavourited
				? favouritesApi.removeFromFavourites
				: favouritesApi.addToFavourites;

			promiseAction(slug)
				.then(article => {
					context.commit(mutationTypes.addToFavouritesSuccess);
					resolve(article);
				})
				.catch(() => {
					context.commit(mutationTypes.addToFavouritesFailure);
				})
		});
	},
};

export default {
	mutations,
	actions,
};
