const request = require('request');

const convertImage = async (image) => {
	return new Promise((resolve) => {
		request.get(image, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				data = Buffer.from(body).toString('base64');
				resolve(data);
			}
		});
	});
};

module.exports = convertImage;
