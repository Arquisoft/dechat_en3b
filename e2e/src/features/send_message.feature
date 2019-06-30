Feature: Send a message to a contact
    Users want to send messages to other users

    Scenario: I want to send a message to a contact I have a chat with
        Given I am not doing anything inside the app
        When I write Hola in the chat box and click on the send button
        Then Hola appears in my chat, in my contact's chat and is written in my POD