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

driver = webdriver.Chrome('D:\Users\Chino\Documents\Universidad\Python\chromedriver')
newChatName = 'Selenium testing ' + str(int(round(time.time() * 1000)))
numeroMensaje = 1

def login(cuentaUsuario):
    ## SIMPLE METHOD TO LOGIN
    driver.refresh()
    time.sleep(5)
    select = driver.find_element_by_class_name('ng-select-container')
    select.click()
    time.sleep(5)
    solid = driver.find_elements_by_class_name('ng-option')
    solid[1].click()

    time.sleep(5)

    go = driver.find_element_by_class_name('wide-button')
    go.click()

    time.sleep(5)

    user = driver.find_element_by_id('username')
    user.send_keys(str(cuentaUsuario))
    user = driver.find_element_by_id('password')
    user.send_keys('Arquisoft$')
    user.send_keys(Keys.RETURN);

    time.sleep(5)

## hasta aqui login

def logout():
    ## LOGS OUT OF THE PROFILE
    driver.refresh()
    logout = driver.find_element_by_id('buttonLogout')
    dropdownFriends = driver.find_element_by_xpath('//*[@id="header"]/div/button')


    dropdownFriends.click()
    logout.click()
    time.sleep(5)


def createGroup():
    ## CREATES A NEW GROUP EACH TIME
    driver.refresh()

    time.sleep(5)

    dropdownFriends = driver.find_element_by_xpath('//*[@id="header"]/div/button')

    newGroup = driver.find_element_by_id('buttonFriends')

    dropdownFriends.click()
    newGroup.click()

    time.sleep(5)

    friend1 = driver.find_element_by_xpath('/html/body/app-root/app-friends/div/div[1]/app-friend[1]/div')
    friend2 = driver.find_element_by_xpath('/html/body/app-root/app-friends/div/div[1]/app-friend[2]/div')
    friend1.click()
    friend2.click()

    chatName = driver.find_element_by_id('chatName')
    chatName.send_keys(newChatName)

    createButton = driver.find_element_by_xpath('//*[@id="nameForNewChat"]/button')
    createButton.click()

    time.sleep(5)

## hasta aqui crear un chat

def sendMessage():
    ## SENDS A MESSAGE TO THE CHAT WE HAVE JUST CREATED
    numeroMensaje = 1
    driver.refresh()
    time.sleep(5)

    ##chats = driver.find_elements_by_xpath('//*[@id="contactsList"]/')
    xpathChatNuevo = "//*[contains(text(), '"+ newChatName + "')]"
    chatNuevo = driver.find_element_by_xpath(xpathChatNuevo)
    chatNuevo.click()

    time.sleep(5)

    campoMensaje = driver.find_element_by_id('messageContent')
    campoMensaje.click()
    campoMensaje.send_keys('Mensaje ' + str(numeroMensaje))

    time.sleep(5)
    botonEnviar = driver.find_element_by_xpath('//*[@id="typeBar"]/button')
    botonEnviar.click()
    time.sleep(5)

    xpathMensaje = "//*[contains(text(), '"+ 'Mensaje ' + str(numeroMensaje) + "')]"
    chatNuevo = driver.find_element_by_xpath(xpathMensaje)
    numeroMensaje += 1


## hasta aqui mandar un mensaje

def deleteChat():
    ## DELTES THE CHAT CREATED FOR TESTING
    driver.refresh()
    time.sleep(5)

    ##chats = driver.find_elements_by_xpath('//*[@id="contactsList"]/')
    xpathChatNuevo = "//*[contains(text(), '"+ newChatName + "')]/.."
    chatNuevo = driver.find_element_by_xpath(xpathChatNuevo)
    chatNuevoDelete = chatNuevo.find_element_by_xpath(".//*[contains(text(), 'Delete Chat')]")

    chatNuevoDropDown = chatNuevo.find_element_by_xpath(".//*[contains(@class, 'dropDownBtn')]")


    time.sleep(5)
    chatNuevoDropDown.click()
    chatNuevoDelete.click()
    driver.refresh()




## hasta aqui borrar un chat



def main():
    print(newChatName)
    driver.get('http://localhost:4200')
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
