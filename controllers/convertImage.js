const request = require('request').defaults({ encoding: null });

const convertImage = async (image) => {
	// returns promise
	return new Promise((resolve) => {
		// requests the image from url provided
		request.get(image, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				// converts image to base64 string and resolves that data
				data = Buffer.from(body).toString('base64');
				resolve(data);
			}
		});
	});
};

module.exports = convertImage;
