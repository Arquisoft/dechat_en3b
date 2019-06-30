Feature: Delete a message from a chat
    Users often want to delete particular messages from chats

    Scenario: I want to delete a message from a chat
        Given I am not doing anything inside the app
        When I left click in a message and click on the Delete option
        Then the message disappears from my chat, my contact's chat, and is deleted from my POD