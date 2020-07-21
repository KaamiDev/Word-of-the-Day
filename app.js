require('dotenv').config();
const CronJob = require('cron').CronJob;

const getWord = require('./controllers/getWord.js');
const getImage = require('./controllers/getImage.js');
const convertImage = require('./controllers/convertImage.js');
const postTweet = require('./controllers/postTweet.js');

// setup cron job to tweet a new word everyday at 12PM (server time)
let job = new CronJob('0 12 * * *', function() {
	// call make tweet function
	makeTweet();
});

// start cron job
job.start();
console.log('Cron job started, running every day at 12PM...');

// define make tweet function
const makeTweet = async () => {
	// gets random word and definiton info
	let word = await getWord();

	// creates image card with random word
	let image = await getImage(word);

	// converts said image into base64 url string
	image = await convertImage(image);

	// tweets everything out
	postTweet(word.word, image);
};
