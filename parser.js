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
	},

	getCSRF: async (document) => {	// csrf is found as the value of attribute 'value' in csrftoken class 
		return document.querySelector('.csrftoken').getAttribute('value');
	},

	querySelector: async (document, selector) => {
		return document.querySelector(selector);
	}
}