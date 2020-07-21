require('dotenv').config();
const getWord = require('./controllers/getWord.js');
const getImage = require('./controllers/getImage.js');

const makeTweet = async () => {
	let word = await getWord();
	let image = await getImage(word);
	console.log(image);
};
makeTweet();
