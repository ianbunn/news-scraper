# news-scraper

News scraper

## NPM installations

The package.json includes the following dependencies:

- `express`
- `express-handlebars`
- `mongoose`
- `cheerio`
- `axios`

Run the command below to install the dependies needed to run the app:

```shell
npm install
```

## Data persistence

The database used for this app is `mongodb`. Since this is deployed in Heroku, you can run a free `mongodb` instance by using `mLAb`

## User experience

Whenever user visits app site, the app scrapes stories from ________ and displays them to allow the user to save the articles. Each scraped article saved by the user will be stored in `mongodb`.

The scraped news article contains:

- Headline - title of the article
- Summary - a short summary of the article
- URL - the url to the original article
- Photos?

Users can add comments to saved news articles, and delete the comments saved. All comments are also stored in `mongodb`.
