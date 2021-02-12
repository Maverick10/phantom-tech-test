const input = require('./input');
const request = require('./request');
const parser = require('./parser');

const work = async () => {   // an async function wrapper
	input.userInput('Please enter your search query: ')	// get the search query from user
		.then((searchQuery) => {
			request.searchForProduct(searchQuery)
				.then(async (responseText) => {
					const parsedResults = await parser.parse(responseText);
					const products = await parser.querySelectorAll(
						parsedResults, '.product__linkcontainer');
					let productOrder = 1;
					const readableProducts = products.map((product) => {
						return {
							order: productOrder++,
							id: parser.getAttribute(product, 'data-product-id'),
							title: parser.getAttribute(product, 'title'),
							href: parser.getAttribute(product, 'href')
						}
					})
					console.log(readableProducts);
					input.userInput(`Please enter the order of your desired product from`
						+ ` the previous list: (Integer [1-${productOrder - 1}])\n`)
						.then((userProductOrder) => {
							request.productDetails(
								readableProducts[userProductOrder - 1].href)
								.then(async (response) => {
									const responseText = await response.text();
									const responseCookies = await response.headers.raw()['set-cookie'];
									const rawCookies = responseCookies.join([separator = '; ']);
									const productDocument = await parser.parse(responseText);
									// console.log(productDocument);
									const csrf = await parser.getCSRF(productDocument);
									// console.log(rawCookies)
									// console.log(csrf);
								})
						})
				})
		})
		.catch(err => console.error(err))
}

work();