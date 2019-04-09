import { browser, by, element } from 'protractor';

export class AppPage {
	navigateTo() {
		return browser.get('/');
	
	}

	getTitleText() {
		return element(by.css('app-root h1')).getText();
	}
	
	 getDescriptionLogin() {
        return element(by.css('h2')).getText();
    }
	
    clickOnRegisterButton() {
        return element(by.id('registerButton')).click();
    }
}