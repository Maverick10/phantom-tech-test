const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    userInput: async (question) => {
        return new Promise((resolve, reject) => {
            rl.question(question, async (searchQuery) => {
                console.log(`You entered ${searchQuery}`);
                rl.close();
                resolve(searchQuery);
            })
        })
    }
}