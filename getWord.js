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
	try {
		let body = await rp.get(
			`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=[^\\s-]&lettersMin=3&lettersMax=15&hasDetails=definitions&random=true`,
			options
		);
		return JSON.parse(body);
	} catch (err) {
		console.log(err);
	}
};

module.exports = getWord;
