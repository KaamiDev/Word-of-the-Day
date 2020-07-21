require('dotenv').config();
const getWord = require('./controllers/getWord.js');
const getImage = require('./controllers/getImage.js');
const convertImage = require('./controllers/convertImage.js');

const makeTweet = async () => {
	// gets random word and definiton info
	let word = await getWord();

	// creates image card with random word
	let image = await getImage(word);

	// converts said image into base64 url string
	image = await convertImage(image);
};
makeTweet();
