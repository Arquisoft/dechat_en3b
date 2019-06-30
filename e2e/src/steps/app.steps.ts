import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';
import { element } from '@angular/core/src/render3/instructions';
import { login } from 'solid-file-client';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

//Login
Given(/^I open the app and I am not logged in$/, async () => {
  //await page.navigateTo();
});

When(/^I choose a ID provider, enter my credentials and press the Log In button$/, async () => {
    //await page.clickSelectIDProvider();
    //await page.clickSolidCommunity();
    //await page.clickGoButton();   
    //await page.enterCredentials();
});

Then(/^my chats are shown$/, async () => {
    //var elementmessage = await page.returnTypeAMessage();
    //expect(elementmessage === 'Type a message...');
});


//Add chat
Given(/^I am searching my contacts$/, async () => {
  //await page.navigateTo();
  //await page.login();
  // //missing: move the mouse over the options button 
  //await page.clickFriendsButton();
});

When(/^I click in a contact, write a chat name and click on Next$/, async () => {
  //TBD
  //await click in a contact...
  //await write Chat name
  //await go next
});

Then(/^a new chat with the chosen name appears in the chat list$/, async () => {
  //TBD
  //expect( for all chats, there exist one with the chosen name);
  //expect(true);
});

//check_documentation_inside
Given(/^I am not doing anything inside the app$/, async () => {
  //await page.navigateTo();
  //await page.login();
});

When(/^I move the mouse over the options button and click the documentation button$/, async () => {
  //missing: move the mouse over the options button 
  //await page.clickDocumentationButton();
});

Then(/^the documentation appears in a new tab$/, async () => {
  //TBD
  //expect(true);
});

//check_documentation_outside
When(/^I click the documentation button in the login$/, async () => {
  //TBD, button not implemented
});

//delete chat
When(/^I move the mouse over a chat options and left click on Delete Chat$/, async () => {
  //TBD
  //missing: move the mouse over the options button 
  //await page.clickDeleteChatButton();
});

Then(/^the chat disappears from the chat list and its messages are deleted from my POD$/, async () => {
  //TBD
  //count number of contacts before and after, check there is one less
  //expect(true);
});


//delete message
When(/^I move the mouse over a message options and left click on Delete Chat$/, async () => {
  //TBD
  //this feature is not implemented yet
});

Then(/^the message disappears from my chat, my contact's chat, and is deleted from my POD$/, async () => {
  //TBD
  //this feature is not implemented yet
  //expect(true);
});

//filter chat
When(/^I write Paco in the Search contacts field$/, async () => {
  //TBD
  //await page.writePacoInSearchContactsField();
});

Then(/^the chat with Paco should be the only one visible in the chat list$/, async () => {
  //TBD
  //expect(true);
});


//logout
When(/^I move the mouse over the options button and press the Log Out button$/, async () => {
  //TBD
  //missing: move the mouse over the options button 
  //await page.clickLogoutButton();
});

Then(/^the app is closed and I see the Log In$/, async () => {
  //TBD
  //expect(true);
});


//send message
When(/^I write Hola in the chat box and click on the send button$/, async () => {
  //await page.writeHolaInMessageField();
  //await page.clickSendMessageButton();
});

Then(/^Hola appears in my chat, in my contact's chat and is written in my POD$/, async () => {
  //TBD
  //expect(true);
});

