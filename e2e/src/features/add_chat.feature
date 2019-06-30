Feature: Add a new chat with a contact
    Users want to chat with their friends

    Scenario: I want to add new chat
        Given I am searching my contacts
        When I click in a contact, write a chat name and click on Next
        Then a new chat appears in the chat list