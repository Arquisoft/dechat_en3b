#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      David
#
# Created:     23/03/2019
# Copyright:   (c) David 2019
# Licence:     <your licence>
#-------------------------------------------------------------------------------
from selenium import webdriver
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
import time

## needs selenium, python 2.7.15 y chromedriver 73 (not 74)
pathTravis = '/usr/local/share/chromedriver'
pathWindows = "D:\Users\Chino\Documents\Universidad\Python\chromedriver.exe"

newChatName = 'Selenium testing ' + str(int(round(time.time() * 1000)))
numeroMensaje = 1
timeHeadless = 10
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--proxy-server='direct://'")
chrome_options.add_argument("--proxy-bypass-list=*")
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--ignore-certificate-errors')

driver = webdriver.Chrome(pathTravis)
driver = webdriver.Chrome(options=chrome_options)

def login(cuentaUsuario):
    ## SIMPLE METHOD TO LOGIN
    driver.refresh()
    time.sleep(timeHeadless)
    select = driver.find_element_by_class_name('ng-select-container')
    select.click()
    time.sleep(timeHeadless)
    solid = driver.find_elements_by_class_name('ng-option')
    solid[1].click()

    time.sleep(timeHeadless)

    go = driver.find_element_by_class_name('wide-button')
    go.click()

    time.sleep(timeHeadless)

    user = driver.find_element_by_id('username')
    user.send_keys(str(cuentaUsuario))
    user = driver.find_element_by_id('password')
    user.send_keys('Arquisoft$')
    user.send_keys(Keys.RETURN);

    time.sleep(timeHeadless)

## hasta aqui login

def logout():
    ## LOGS OUT OF THE PROFILE
    driver.refresh()
    logout = driver.find_element_by_id('buttonLogout')
    dropdownFriends = driver.find_element_by_xpath('//*[@id="header"]/div/button')


    dropdownFriends.click()
    logout.click()
    time.sleep(timeHeadless)


def createGroup():
    ## CREATES A NEW GROUP EACH TIME
    driver.refresh()

    time.sleep(timeHeadless)

    dropdownFriends = driver.find_element_by_xpath('//*[@id="header"]/div/button')

    newGroup = driver.find_element_by_id('buttonFriends')

    dropdownFriends.click()
    newGroup.click()

    time.sleep(timeHeadless)

    friend1 = driver.find_element_by_xpath('/html/body/app-root/app-friends/div/div[1]/app-friend[1]/div')
    friend2 = driver.find_element_by_xpath('/html/body/app-root/app-friends/div/div[1]/app-friend[2]/div')
    friend1.click()
    friend2.click()

    chatName = driver.find_element_by_id('chatName')
    chatName.send_keys(newChatName)

    createButton = driver.find_element_by_xpath('//*[@id="nameForNewChat"]/button')
    createButton.click()

    time.sleep(timeHeadless)
    driver.refresh()
    time.sleep(timeHeadless)

    xpathChatNuevo = "//*[contains(text(), '"+ newChatName + "')]"
    chatNuevo = driver.find_elements_by_xpath(xpathChatNuevo)
    print("elementos: " + str(len(chatNuevo)))
    assert len(chatNuevo) == 1

## hasta aqui crear un chat

def sendMessage():
    ## SENDS A MESSAGE TO THE CHAT WE HAVE JUST CREATED
    numeroMensaje = 1
    driver.refresh()
    time.sleep(timeHeadless)

    ##chats = driver.find_elements_by_xpath('//*[@id="contactsList"]/')
    xpathChatNuevo = "//*[contains(text(), '"+ newChatName + "')]"
    chatNuevo = driver.find_element_by_xpath(xpathChatNuevo)
    chatNuevo.click()

    time.sleep(timeHeadless)

    campoMensaje = driver.find_element_by_id('messageContent')
    campoMensaje.click()
    campoMensaje.send_keys('Mensaje ' + str(numeroMensaje))

    time.sleep(timeHeadless)
    botonEnviar = driver.find_element_by_xpath('//*[@id="typeBar"]/button')
    botonEnviar.click()
    time.sleep(timeHeadless)

    xpathMensaje = "//*[contains(text(), '"+ 'Mensaje ' + str(numeroMensaje) + "')]"
    chatNuevo = driver.find_elements_by_xpath(xpathMensaje)
    print("elementos: " + str(len(chatNuevo)))
    assert len(chatNuevo) == 1
    numeroMensaje += 1


## hasta aqui mandar un mensaje

def deleteChat():
    ## DELTES THE CHAT CREATED FOR TESTING
    driver.refresh()
    time.sleep(timeHeadless)

    ##chats = driver.find_elements_by_xpath('//*[@id="contactsList"]/')
    xpathChatNuevo = "//*[contains(text(), '"+ newChatName + "')]/.."
    chatNuevo = driver.find_element_by_xpath(xpathChatNuevo)
    chatNuevoDelete = chatNuevo.find_element_by_xpath(".//*[contains(text(), 'Delete Chat')]")

    chatNuevoDropDown = chatNuevo.find_element_by_xpath(".//*[contains(@class, 'dropDownBtn')]")


    time.sleep(timeHeadless)
    chatNuevoDropDown.click()
    chatNuevoDelete.click()

    driver.refresh()
    chatNuevo = driver.find_elements_by_xpath(xpathChatNuevo)
    print("elementos: " + str(len(chatNuevo)))
    assert len(chatNuevo) == 0




## hasta aqui borrar un chat



def main():
    print(newChatName)
    driver.get('http://localhost:4200')
    time.sleep(timeHeadless)
    login('dechaten3b1')
    createGroup()
    sendMessage()
    deleteChat()
    logout()

    print("primera cuenta")

    driver.quit()

    ##time.sleep(5)
    ##login('dechaten3b3')
    #sendMessage()
    #deleteChat()
    #logout()


    print("ta to gucci")



if __name__ == '__main__':
    main()
