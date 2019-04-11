var letter = require("./letter");

function Word(str){
    this.word = str;
    this.arrCurrentWord = [];
    this.hint = '';
    
    //Returns true if all letters in the word have been guessed.
    this.guessed = function (){
        var guessed = true;
        for (var i = 0; i < this.arrCurrentWord.length; i ++){
            if(!(this.arrCurrentWord[i].guessed)) {
                guessed = false;
                break;
            }
        };
        return(guessed);
    }

    //1. Finds all matched letters in the word.
    //2. Returns true if we found matching letter in the underlying word
    this.findMatchingLetters = function (char){
        var found = false;
        for (var i = 0; i < this.arrCurrentWord.length; i ++){
            if(this.arrCurrentWord[i].matched(char) === 1) found = true;
        };
        return(found);
    };

    //Display the underlying word in its current status,
    //showing only guessed letters and a placeholder for the ones that are not guessed.
    this.display = function(){
        var tempArr = [];
        for (var i = 0; i < this.arrCurrentWord.length; i ++){
            tempArr.push(this.arrCurrentWord[i].getLetter())
        }
        console.log(tempArr.join(" ") + "\n");
    };

    //Intialize letter objects with underlying character and guess status (initially set to false)
    for (var i = 0; i < this.word.length; i ++){
        if (!(this.word[i] == " ")) this.arrCurrentWord.push(new letter(this.word[i]))
        else this.arrCurrentWord.push(this.word[i]);
    }
}
module.exports = Word;
