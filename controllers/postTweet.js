const Twit = require('twit');

let T = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000,
	strictSSL: true
});

const postTweet = (word, image) => {
	T.post('media/upload', { media_data: image }, function(err, data, response) {
		let mediaIdStr = data.media_id_string;
		let meta_params = { media_id: mediaIdStr };

		T.post('media/metadata/create', meta_params, function(err, data, response) {
			if (!err) {
				// now we can reference the media and post a tweet (media will attach to the tweet)
				let params = { status: 'Today\'s #WordOfTheDay is "' + word + '"!', media_ids: [ mediaIdStr ] };

				T.post('statuses/update', params, function(err, data, response) {
					console.log('Tweeted Successfully! The word was ' + word);
				});
			}
		});
	});
};

module.exports = postTweet;
