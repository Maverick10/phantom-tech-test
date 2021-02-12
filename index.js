const input = require('./input');
const request = require('./request');

const work = async () => {   // an async function wrapper
    input.userInput('Please enter your search query: ')
        .then((searchQuery) => {
            request.searchForProduct(searchQuery)
                .then((responseText) => {
                })
        })
}

work();