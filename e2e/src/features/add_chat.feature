Feature: Add a new chat with a contact
    Users want to chat with their new contacts

    Scenario: I want to add a new contact
        Given I am searching my contacts
        When I click in a contact
        Then a new chat appears in the chat list