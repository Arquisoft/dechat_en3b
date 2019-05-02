import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Given(/^I open the app and I am not logged in$/, async () => {
  await page.navigateTo();
});

When(/^I enter credentials$/, async () => {
    await page.openList();
    await page.selectSolid();
    await page.goRegister();
    
    await page.enterCredentials();
});

Then(/^I go to the chat$/, async () => {
    expect(await page.useChat().getAttribute('placeholder')).to.equal('Type a message...');
});