Feature: Filter the current chats
    Users want to be able to search for a specific chat 

    Scenario: I want to search for my chat with Paco
        Given I am not doing anything in the app
        When I click in Search contacts, write Paco and click the search button
        Then the chat with Paco should be the only one visible in the chat list