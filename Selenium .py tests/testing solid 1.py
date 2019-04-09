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

def main():
    ##driver casa
    #driver = webdriver.Chrome('D:\Users\Chino\Documents\Universidad\Python\chromedriver')

    ##driver uni
    driver = webdriver.Chrome('C:\Users\uo251480\Documents\Python\chromedriver')
    driver.get('http://localhost:4200/');
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
    user.send_keys('dechaten3b01')
    user = driver.find_element_by_id('password')
    user.send_keys('1234Abcd!!')
    user.send_keys(Keys.RETURN);

    time.sleep(5)

## hasta aqui login

    logout = driver.find_element_by_id('button2')
    logout.click()

    time.sleep(5)

    ##  log in + log out





if __name__ == '__main__':
    main()
