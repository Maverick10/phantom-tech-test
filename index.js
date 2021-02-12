const input = require('./input');
const request = require('./request');
const parser = require('./parser');

const work = async () => {   // an async function wrapper
	input.userInput('Please enter your search query: ')	// get the search query from user
		.then((searchQuery) => {
			request.searchForProduct(searchQuery)	// use the website's search feature
				.then(async (responseText) => {
					const parsedResults = await parser.parse(responseText);	// parsing search results
					const products = await parser.querySelectorAll(
						parsedResults, '.product__linkcontainer');
					let productOrder = 1;
					const readableProducts = products.map((product) => {	// for better readability of products
						return {
							order: productOrder++,	// for referencing during product choice
							id: parser.getAttribute(product, 'data-product-id'),	// unique identifier of product
							title: parser.getAttribute(product, 'title'),
							href: parser.getAttribute(product, 'href')
						}
					})
					console.log(readableProducts);
					input.userInput(`Please enter the order of your desired product from`
						+ ` the previous list: (Integer [1-${productOrder - 1}])\n`)	// choosing the desired product of the listed options
						.then((userProductOrder) => {
							request.productDetails(
								readableProducts[userProductOrder - 1].href)
								.then(async (response) => {
									const responseText = await response.text();
									const responseCookies = await response.headers.raw()[
										'set-cookie'];
									const rawCookies = responseCookies.join([separator = '; ']);	// to make it a long string separated with ;
									const productDocument = await parser.parse(responseText);
									const csrf = await parser.getCSRF(productDocument);		// getting the cookies and csrf in order not to get invalid token response

									request.addToCart(readableProducts[userProductOrder - 1].id,
										csrf, rawCookies)
										.then(async (response) => {
											const addToCartDocument = await parser.parse(response);

											const bagCount = (await parser.querySelector(
												addToCartDocument, '.bag-count')).rawText;
											console.log(`Your bag now contains ${bagCount} item(s)`);	// reading the bag size
											input.close();
										})
								})
						})
				})
		})
		.catch((err) => { console.error(err); input.close(); })
}

work();