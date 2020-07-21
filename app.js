require('dotenv').config();
const getWord = require('./getWord.js');
const getImage = require('./getImage.js');

const makeTweet = async () => {
	let word = await getWord();
	let image = await getImage(word);
	console.log(image);
};
makeTweet();
