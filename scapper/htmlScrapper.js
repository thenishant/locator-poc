const {chromium} = require('@playwright/test');
const fs = require('fs');
const yaml = require('js-yaml');

async function scrapeIdsFromReactPage(url) {
    let browser;
    let page;
    try {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(url);
        return await page.evaluate(() => {
            const elementsWithIds = document.querySelectorAll('[id]');
            const idsArray = {};
            elementsWithIds.forEach((element) => {
                const id = element.getAttribute('id');
                const title = element.getAttribute('data-name');
                if (id) {
                    idsArray[title] = `#${id}`;
                }
            });
            return idsArray;
        });
    } catch (error) {
        console.error('Error scraping React page for IDs:', error);
        return {};
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

const pageUrl = 'https://thenishant.github.io/react-redux-todo-app/';
const scrapedIdsPromise = scrapeIdsFromReactPage(pageUrl);

scrapedIdsPromise
    .then((ids) => {
        const filePath = 'scrapedIds.yml';
        const yamlData = yaml.dump(ids, {indent: 2});
        fs.writeFileSync(filePath, yamlData);
        console.log(`IDs written to ${filePath}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
