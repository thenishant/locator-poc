import * as yaml from 'js-yaml';

import {expect, test} from '@playwright/test';
import * as fs from "fs";

// async function readYamlFromInternet(url: string) {
//     try {
//         const response = await axios.get(url);
//         return yaml.load(response.data);
//     } catch (error) {
//         console.error('Error reading YAML from internet:', error);
//         return null;
//     }
// }

// const yamlUrl = 'https://gist.githubusercontent.com/thenishant/9f82bfac3ed412b1539124d7e7e65dc0' +
//     '/raw/f1656343a11d3d669277214798ed86afdae284e5/locators.yml';

const jsonFilePath = "scrapedIds.yml";

async function readYamlFromFile(filePath) {
    try {
        const yamlData = await fs.promises.readFile(filePath, 'utf8');
        return yaml.load(yamlData);
    } catch (error) {
        console.error('Error reading YAML from file:', error);
        return null;
    }

}

// readYamlFromFile(jsonFilePath)
//     .then((data) => {
//         console.log('YAML data:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

test('should be able to add a todo', async ({page}) => {
    const data = await readYamlFromFile(jsonFilePath);

    await page.goto('https://thenishant.github.io/react-redux-todo-app/');

    await page.locator(data.textBox).fill('Todo Title');
    await page.locator(data.submitButton).click();
    await page.locator(data.textBox).fill('Todo desc');
    await page.locator(data.submitButton).click();

    // await expect(page.locator(data.cardTitle)).toHaveText('Todo Title');
    await expect(page.locator(data.pageTitle)).toHaveText('Todo App');
    // await expect(page.locator(data.cardDesc)).toHaveText('Todo desc');
});
