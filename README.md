# Character_Sheet_Creator

Application to create and modify our character

# Start the app

* install node.js : https://nodejs.org/en
* go to repository
* ```npm install``` -> populates the node_modules repository (takes a lot of space sometimes !)
* ```npm start``` -> opens the app in a browser, localhost:3000

# Things to take into account
 
* Front is only used to create / modify characters
* URL is made with the ID of the character (primary key) example: localhost:3000/ID
* URL is provided by the bot
* To modify a character:
    * Bot command modify -> calls get from API with ID game and ID player
    * Backend returns ID of character
    * Bot displays URL with character ID
* To create a character:
    * Bot command create -> calls the backend API that creates a new blank character
    * Backend returns the URL with ID of the new character
    * Bot displays the URL
    * In the app, calls for put instead of create