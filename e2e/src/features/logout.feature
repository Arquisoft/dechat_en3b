Feature: Log out of DeChat
    Users want to close their session when they finish using the app

    Scenario: I click in the Log Out button
        Given I am not doing anything in the app
        When I press the Log Out button
        Then the app is closed and I see the Log In