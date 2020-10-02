var rp = require('request-promise');

const getImage = async (word) => {
	// creates image template with word info and destructures html and css
	let { html, css } = createImageHTML(word);

	// defines data to be sent to api for conversion
	let data = {
		html,
		css
	};

	// sends data to api to convert into png image
	let image = await rp
		.post({ url: 'https://hcti.io/v1/image', form: data })
		.auth(process.env.API_ID, process.env.API_KEY);
	// returns url of that image
	return JSON.parse(image).url;
};

const createImageHTML = (word) => {
	// defines date variable for image
	let date = new Date();

	// defines month array for image
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
		'October',
		'November',
		'December'
	];

	// defines days array for image
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

	// defines colors array corresponding to different days for image
	let colors = [ '#00A8FF', '#0D48D2', '#D20D69', '#3BD20D', '#FFA200', '#DD1BD7', '#882AE6' ];

	// only returns first three definitions
	definitionsArr = word.results.slice(0, 3);

	// defines and enforces character limits on definitons
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

	// creates array of elements to substitute into html template
	definitionsArrToDisplay = definitionsArr.map((definition) => {
		return `<li><p><span>[<em>${definition.partOfSpeech}</em>]:</span> ${definition.definition}</p></li>`;
	});

	// returns object of html and css completed template with info provided
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
