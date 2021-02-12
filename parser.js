const parser = require('node-html-parser');

module.exports = {
    parse: async (document) => {
        return parser.parse(document);
    },

    querySelectorAll: async (document, selector) => {
        return document.querySelectorAll(selector);
    },

    getAttribute: (document, attr) => {
        return document.getAttribute(attr);
    }
}