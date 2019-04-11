
function Letter(char) {
    this.underlyingCharacter = char;
    this.placeHolderCharacter = "_";
    this.guessed = false;
    this.getLetter = function(){
        return (this.guessed ? this.underlyingCharacter : this.placeHolderCharacter);
    };
    this.matched = function (char) {
        var answer = 0; //word not found
        if (char == this.underlyingCharacter){
            this.guessed = true;
            answer = 1; //word found
        }
        return(answer);
    };
}
module.exports = Letter;