const readLine = require('readline');
const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

module.exports = {
	userInput: async (question) => {
		return new Promise((resolve, reject) => {
			rl.question(question, async (answer) => {
				console.log(`You entered ${answer}`);
				resolve(answer);
			})
		})
	}
}