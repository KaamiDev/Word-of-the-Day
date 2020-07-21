var rp = require('request-promise');

const getWord = async () => {
	var options = {
		headers: {
			'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
			'x-rapidapi-key': 'eed735b6e3msh08dc4b792574629p17981ejsn05f067454afb',
			useQueryString: true
		}
	};

	let word;
	while (true) {
		try {
			let word = JSON.parse(
				await rp.get(
					`https://wordsapiv1.p.rapidapi.com/words/?lettersMin=3&lettersMax=15&hasDetails=definitions&random=true`,
					options
				)
			);
			if (word.word.indexOf(' ') >= 0 || (word.syllables === undefined || word.results[0].definition > 205)) {
				continue;
			} else {
				return word;
			}
		} catch (err) {
			console.log(err);
			break;
		}
	}
};

module.exports = getWord;
