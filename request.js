const fetch = require('node-fetch');

module.exports = {
	searchForProduct: async (searchQuery) => {
		return new Promise((resolve, reject) => {
			const searchQueryStringParams = new URLSearchParams({
				q: searchQuery
			});
			const searchURL = new URL('https://www.shopdisney.co.uk/search');
			searchURL.search = searchQueryStringParams.toString();
			fetch(searchURL, {
				method: 'GET',
				redirect: 'follow'
			})
				.then(response => resolve(response.text()))
				.catch(err => reject(err))
		})
	},

	productDetails: async (href) => {
		return new Promise((resolve, reject) => {
			fetch(href, {
				method: 'GET',
				redirect: 'follow'
			})
				.then(response => resolve(response))
				.catch(err => reject(err))
		})
	}
}