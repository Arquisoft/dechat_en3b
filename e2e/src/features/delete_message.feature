Feature: Delete a message from a chat
    Users often want to delete particular messages from chats

    Scenario: I want to delete a message from a chat
        Given I am not doing anything inside the app
        When I move the mouse over a message options and left click on Delete Chat
        Then the message disappears from my chat, my contact's chat, and is deleted from my POD