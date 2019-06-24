Feature: Send a message to a contact
    Users want to send messages to other users

    Scenario: I want to send a message to a contact I have a chat with
        Given I am in a chat
        When I write something in the chat box and click on the send button
        Then my message appears in my chat, in my contact's chat and is written in my POD