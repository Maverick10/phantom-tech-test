const { rejects } = require('assert');
const fetch = require('node-fetch');
const { resolve } = require('path');

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
    }
}