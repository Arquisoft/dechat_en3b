Feature: Check the app documentation outside of the app
    Users want to know how to use the app when they are not logged in

    Scenario: I want to see the documentation outside of the app
        Given I am not doing anything outside of the app
        When I click the documentation button
        Then the documentation appears in a new tab