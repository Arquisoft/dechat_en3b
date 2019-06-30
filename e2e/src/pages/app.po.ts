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

    clickLogout(){
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
}

