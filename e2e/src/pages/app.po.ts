import { browser, by, element } from 'protractor';

export class AppPage {
	
	readonly username = 'dechaten3b1'
    readonly password = 'Arquisoft$'
	
	navigateTo() {
        //navigate to the home page
		return browser.get('/');
		
	}

    enterCredentials(){
        element(by.css('[placeholder = "Username"]')).sendKeys(this.username);
        element(by.css('[placeholder = "Password"]')).sendKeys(this.password);
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
        return element(by.css('[placeholder = "Type a message..."]')).getText();
    }

    clickFriendsButton(){
        element(by.id('buttonFriends')).click();   
    }

    login(){
        this.clickSelectIDProvider();
        this.clickSolidCommunity();
        this.clickGoButton();
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

}

