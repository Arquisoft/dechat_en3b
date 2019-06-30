Feature: Check the app documentation outside of the app
    Users want to know how to use the app when they are not logged in

    Scenario: I want to see the documentation outside of the app
        Given I open the app and I am not logged in
        When I click the documentation button in the login
        Then the documentation appears in a new tab