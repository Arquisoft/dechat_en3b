Feature: Check the app documentation when a user is using the app
    Users want to know how to use the app when they are already logged in

    Scenario: I want to see the documentation inside of the app
        Given I am not doing anything inside the app
        When I move the mouse over the options button and click the documentation button
        Then the documentation appears in a new tab