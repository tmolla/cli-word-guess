/*
Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses
*/
var config = {
    app_id : "e506fb9f",
    app_key : "781338ab5c86990b3f2ab9f4ddb5c30d",
    source_lang :  "en"
}
var word = require("./word")
var inquirer = require('inquirer');
var Dictionary = require("oxford-dictionary");
var randomWords = require("random-words")
var dict = new Dictionary(config);
var myWord = ""
var randomWord = ""

playGame();

//Starts the game and allows the user to interact with it
function playGame(){
    var tries,  maxTries, done
    startNewGame()

    function startNewGame() {
        tries = 0;  //Number of tries the user attempted so far. This is intialized to 0 at the start of each game
        maxTries = 9; //The number of guesses the user is allowed to do
        done = false; //set to true if the user guess before reaching the maxTries

        randomWord = randomWords(); //get a random word
        //console.log(randomWord)
        myWord = new word(randomWord); //create the word object 

        var lookup = dict.definitions(randomWord) //get the definition of the word to use for hint
        lookup.then(function(res){
            //var hint = res.results[0].lexicalEntries[0].entries[0].senses[0].definitions.join();
            //Display hint
            console.log("Hint, word meaning - " + res.results[0].lexicalEntries[0].entries[0].senses[0].definitions.join() + "\n")
            promptUser();
        }, function(err){
            console.log(err)
        });
    }

    //function to prompt the user for letter and determine if the user guesse correctly or incorrectly
    function promptUser(){
        inquirer.prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a letter!"
        }]).then(answer => {
            for (var i = 0; i < answer.letter.length; i++){
                if(myWord.findMatchingLetters(answer.letter[i])){
                    console.log("'" + answer.letter[i] + "' is correct!!!\n");
                }else{
                    console.log("'" + answer.letter[i] + "' is incorrect!!!\n")
                    //var remainingTries = maxTries - tries; //calculate the remaining tries
                    maxTries--;
                    console.log(maxTries > 1 ? maxTries + " guesses remaining\n": maxTries + " guess remaining\n");

                }
            }
            myWord.display()
            //console.log(myWord.guessed())
            if (myWord.guessed()){
                console.log("Yea!!! you did it\n")
                playAgain()
            }else if (maxTries <= 0) {
                console.log("Sorry, you have no more guesses left!\nThe word was - " + randomWord + "\n")
                playAgain();
            }else{
                promptUser();
            }
        });
    }

    function playAgain(){
        inquirer.prompt([
            {
                type: "list",
                name: "nextAction",
                message: "What would you like to do next?",
                choices: ["Let me try again", "I am done, let me go!"]
              },
            //{type: "confirm", name: "playAgain", message: "Would you like to play again?"}
        ])
                .then(answer => {
                    //console.log(answer)
                    if(answer.nextAction == "Let me try again") startNewGame()
                    else console.log("Good bye!!!\n") });
    }
}