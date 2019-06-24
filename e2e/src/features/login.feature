Feature: Log in DeChat
    For using the app, users have to enter the credentials of their Solid POD

    Scenario: I enter my credentials to log in
        Given I open the app and I am not logged in
        When I enter my credentials and press the Log In button
        Then my chats are shown