Feature: Check the user's contacts
    Users want to know with which people they can chat with

    Scenario: I want to see my contacts
        Given I am not doing anything in the app
        When I click the contacts button
        Then the contact list appears in the same tab