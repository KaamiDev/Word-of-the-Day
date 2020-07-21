var rp = require('request-promise');

const getImage = async (word) => {
	let { html, css } = createImageHTML(word);

	let data = {
		html,
		css
	};

	let image = await rp
		.post({ url: 'https://hcti.io/v1/image', form: data })
		.auth(process.env.API_ID, process.env.API_KEY);
	return JSON.parse(image).url;
};

const createImageHTML = (word) => {
	let date = new Date();
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'November',
		'December'
	];

	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	let colors = [ '#00A8FF', '#0D48D2', '#D20D69', '#3BD20D', '#FFA200', '#DD1BD7', '#882AE6' ];

	definitionsArr = word.results.slice(0, 3);

	if (definitionsArr.length >= 2) {
		if ((definitionsArr[0].definition + definitionsArr[1].definition).length > 205) {
			definitionsArr = definitionsArr.slice(0, 1);
		}
	}
	if (definitionsArr.length >= 3) {
		if ((definitionsArr[0].definition + definitionsArr[1].definition + definitionsArr[2].definition).length > 205) {
			definitionsArr = definitionsArr.slice(0, 2);
		}
	}
	definitionsArrToDisplay = definitionsArr.map((definition) => {
		return `<li><p><span>[<em>${definition.partOfSpeech}</em>]:</span> ${definition.definition}</p></li>`;
	});
	return {
		html: `<div class="container">
        <h3><strong>WORD OF THE DAY - </strong>${days[date.getDay()]}, ${months[
			date.getMonth()
		]} ${date.getDate()}, ${date.getFullYear()}</h3>
        <h1>${word.word}</h1>
        <h4>[ ${word.syllables.list.join('-')} ]</h4>
        <h5>DEFINITION(s):</h5>
        <ol>
            ${definitionsArrToDisplay.join('')}
        </ol>
    </div>`,
		css: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,600&display=swap');
    .container {
        width: 1060px;
        height: 518px;
        border: 20px solid ${colors[date.getDay()]};
        font-family: 'Open Sans';
        padding: 70px;
    }
    h3 {
        font-size: 35px;
        margin-top: 0;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 0;
    }
    h1 {
        font-size: 100px;
        margin-top: 0;
        text-transform: uppercase;
        color: ${colors[date.getDay()]};
        margin-bottom: 0;
    }
    h4 {
        font-size: 35px;
        font-weight: 600;
        color: ${colors[date.getDay()]};
        margin-top: -10px;
    }
    h5 {
        font-size: 35px;
        margin-bottom: 0;
    }
    ol {
        font-size: 35px;
        margin-top: 10px;
        margin-left: 80px;
    }
    li {
        font-weight: bold;
        color: ${colors[date.getDay()]};
    }
    p {
        font-weight: normal;
        margin: 0;
        color: #000
    }
    span {
        color: ${colors[date.getDay()]};
        font-weight: 600;
    }`
	};
};

module.exports = getImage;
