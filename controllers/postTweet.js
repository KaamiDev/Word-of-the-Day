const Twit = require('twit');

// twitter api key information
let T = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000,
	strictSSL: true
});

const postTweet = (word, image) => {
	// starts by uploading media to twitter
	T.post('media/upload', { media_data: image }, function(err, data, response) {
		let mediaIdStr = data.media_id_string;
		let meta_params = { media_id: mediaIdStr };

		// creates media metadeta from params specified after upload
		T.post('media/metadata/create', meta_params, function(err, data, response) {
			if (!err) {
				// assuming no errors, it then creates a tweet status with the image uploaded attached
				let params = { status: 'Today\'s #WordOfTheDay is "' + word + '"!', media_ids: [ mediaIdStr ] };

				// the tweet is then posted and logged accordingly to the console
				T.post('statuses/update', params, function(err, data, response) {
					console.log('Tweeted Successfully! The word was ' + word);
				});
			}
		});
	});
};

module.exports = postTweet;
