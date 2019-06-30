Feature: Delete a chat when a user is using the app
    Users often want to delete chats

    Scenario: I want to delete a chat
        Given I am not doing anything inside the app
        When I move the mouse over a chat options and left click on Delete Chat
        Then the chat disappears from the chat list and its messages are deleted from my POD