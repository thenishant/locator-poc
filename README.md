Locator-POC

### Introduction

This is a POC project to showcase the use of locators that are being saved in a `YML` file as a key value pair.

The Test will read the key from the `YML` and use the value against the key as the locator.

The Locators are generally stored as the IDs which is scrapped through Playwright script.

### Flow

Before running the tests, the Scrapper will scrap the html page. It will fetch all the IDs available within the page and puts them as key-value pair in a `YML` file.
The Test will the read the `YML` file and use the values from the `YML` file.

Any change in the IDs will automatically be captured by the scrapper.

To Scrap : 
```
node scrapper/htmlScrapper.js
```

To Run Test:
```
npx playwright test
```
