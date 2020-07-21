var rp = require('request-promise');

const getWord = async () => {
	// defines options to be sent to api for getting a random word
	var options = {
		headers: {
			'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
			'x-rapidapi-key': process.env.RAPIDAPI_KEY,
			useQueryString: true
		}
	};

	// defines word variable
	let word;

	// creates looping forever until manually breaked out
	while (true) {
		try {
			// sents api request to get random word with conditions via query strings
			let word = JSON.parse(
				await rp.get(
					`https://wordsapiv1.p.rapidapi.com/words/?lettersMin=3&lettersMax=15&hasDetails=definitions&random=true`,
					options
				)
			);
			// makes sure word is suitable, if not, restarts the loop
			if (word.word.indexOf(' ') >= 0 || (word.syllables === undefined || word.results[0].definition > 205)) {
				continue;
			} else {
				// if yes, returns the word and its info
				return word;
			}
		} catch (err) {
			// logs any errors
			console.log(err);
			break;
		}
	}
};

module.exports = getWord;
