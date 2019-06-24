import { browser, by, element } from 'protractor';

export class AppPage {
	
	readonly username = 'dechaten3b1'
    readonly password = 'Arquisoft$'
	
	navigateTo() {
		return browser.get('/');
		element(by.className('buttonLogout')).click();
        return browser.get('/');
	}

	openList(){
        return element(by.partialLinkText('Select')).click();
    }
	
	selectSolid(){
        return element(by.partialLinkText('Solid')).click();
    }
	
	goRegister(){
        return element(by.buttonText('GO')).click();
    }

    enterCredentials(){
        element(by.id('username')).sendKeys(this.username);
        element(by.id('password')).sendKeys(this.password);
        element(by.id('login')).click();
        
    }
	
	useChat(){
        return element(by.className('messageContent'));
    }
}