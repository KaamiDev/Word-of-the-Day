# Word of the Day Twitter Bot

### A twitter bot that tweets words along with their definition(s) everyday in the form of a beautiful looking image card.

#### How it works
1. A word and it's definition are randomly generated through the https://www.wordsapi.com/ api.
1. This generated information is then substituted into HTML template layouting a clean and minimalistic social media card.
1. This HTML card is then rendered into a PNG image via the https://htmlcsstoimage.com/ api.
1. That image is then tweeted via the Twitter API.
1. A cron job is setup to complete this process once everyday at noon.

#### Note: This bot is still being worked on, it is not yet functional.

Once finished, this twitter bot is located on the twitter handle `@wordoftheday_bot`. If you are interested in expanding your vocabulary every day by doing nothing more than just browsing twitter, consider giving it a follow.