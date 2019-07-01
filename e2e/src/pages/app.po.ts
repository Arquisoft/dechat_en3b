import { browser, by, element } from 'protractor';

export class AppPage {
	
	readonly username = 'dechaten3b2'
    readonly password = 'Arquisoft$'
	
	navigateTo() {
        //navigate to the home page
		return browser.get('/');
		
	}

    enterCredentials(){
        element(by.id('username')).sendKeys(this.username);
        element(by.id('password')).sendKeys(this.password);
        element(by.id('login')).click();
        
    }

    clickLogoutButton(){
        element(by.id('buttonLogout')).click();
    }

    clickSelectIDProvider(){
        element(by.css('[placeholder = "Select ID Provider"]')).click();     
    }

    clickSolidCommunity(){
        element(by.css('[placeholder = "Solid Community"]')).click();     
    }

    clickGoButton(){
        element(by.css('[placeholder = "Go"]')).click();     
    }

    returnTypeAMessage(){
        return element(by.css('[placeholder = "Type a message..."]'));
    }

    clickFriendsButton(){
        element(by.id('buttonFriends')).click();   
    }

    login(){
        this.clickSelectIDProvider();
        this.clickSolidCommunity();
        this.clickGoButton();
        browser.waitForAngular();
        this.enterCredentials();
    }

    clickDocumentationButton(){
        element(by.id('docs')).click();  
    }

    clickDeleteChatButton(){
        element(by.id('deleteChatBtn')).click();  
    }

    writePacoInSearchContactsField(){
        element(by.css('[placeholder = "Search contacts"]')).sendKeys('Paco');
    }

    writeHolaInMessageField(){
        element(by.css('[placeholder = "Type a message..."]')).sendKeys('Hola'); 
    }

    clickSendMessageButton(){
        //the button has no placeholder or identifier...
    }

    returnDropDownBtn(){
        return element(by.id('dropDownBtn'));
    }

}

