const getWord = require('./getWord.js');

const makeTweet = async () => {
	let word = await getWord();
	console.log(word);
};
makeTweet();
