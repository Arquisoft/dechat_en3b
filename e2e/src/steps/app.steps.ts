import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';
import { element } from '@angular/core/src/render3/instructions';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Given(/^I open the app and I am not logged in$/, async () => {
  await page.navigateTo();
});

When(/^I choose a ID provider, enter my credentials and press the Log In button$/, async () => {
    await page.clickSelectIDProvider();
    await page.clickSolidCommunity();
    await page.clickGoButton();   
    await page.enterCredentials();
});

Then(/^my chats are shown$/, async () => {
    var elementmessage = await page.returnTypeAMessage();
    expect(elementmessage === 'Type a message...');
});