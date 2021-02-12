const fetch = require('node-fetch');

module.exports = {
	searchForProduct: async (searchQuery) => {
		return new Promise((resolve, reject) => {
			const searchQueryStringParams = new URLSearchParams({	// fetching the search results html page
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

	productDetails: async (href) => {		// returns product details html page
		return new Promise((resolve, reject) => {
			fetch(href, {
				method: 'GET',
				redirect: 'follow'
			})
				.then(response => resolve(response))
				.catch(err => reject(err))
		})
	},

	addToCart: async (pid, csrf, cookie) => {	// adds given product to cart
		return new Promise((resolve, reject) => {
			const url = new URL('https://www.shopdisney.co.uk/on/demandware.' +
				'store/Sites-disneyuk-Site/en_GB/Cart-AddProduct');
			const addToCartHeaders = new fetch.Headers();
			addToCartHeaders.append('Cookie', cookie);
			const addToCartData = new URLSearchParams({
				format: 'ajax',
				Quantity: 1,	// needs to be user input
				pid: pid,
				csrf_token: csrf
			});
			fetch(url, {
				method: 'POST',
				body: addToCartData,
				headers: addToCartHeaders,
				redirect: 'follow'
			})
				.then(response => resolve(response.text()))
				.catch(err => reject(err))
		})
	}
}