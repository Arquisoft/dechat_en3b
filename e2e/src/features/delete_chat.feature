Feature: Delete a chat when a user is using the app
    Users often want to delete chats

    Scenario: I want to delete a chat
        Given I am not doing anything in the app
        When I right click in a chat and click on Delete
        Then the chat disappears from the chat list and its messages are deleted from my POD