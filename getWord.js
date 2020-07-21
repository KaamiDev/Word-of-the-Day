const wordList = require('./words/words_list.json');

const getWord = () => {
	while (true) {
		// gets random word from word list
		let chosenWord = Object.keys(wordList)[(Object.keys(wordList).length * Math.random()) << 0];
		// log random word
		// console.log('chose word: ' + chosenWord);
		// create object with word info and word name
		let WordFull = {
			word: chosenWord,
			...wordList[chosenWord]
		};
		// make sure word meets criteria, restart loop if it does not
		if (chosenWord.indexOf(' ') >= 0) {
			// console.log('Word has whitespace, rechoosing..');
			continue;
		} else if (WordFull.letters > 15) {
			// console.log('Word too long, rechoosing..');
			continue;
		} else if (WordFull['definitions'] === undefined) {
			// console.log('Word has no definition, rechoosing..');
			continue;
		} else if (WordFull['definitions'].length === 0) {
			// console.log('Word has no definition, rechoosing..');
			continue;
		} else {
			// return word once suitable one is picked
			return WordFull;
		}
	}
};

module.exports = getWord;
