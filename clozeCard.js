var BasicCards = require('./basicCard.js');
var ClozeCard = function(text, cloze) {
    if (text.match(cloze)){
    	this.cardArr = [];
        this.partial = text.split(cloze).join('');
        this.cloze = cloze;
        this.fullText = text;
        this.addBasicCards = function(front,back){
        	this.cardArr.push(new BasicCards(front,back));
        }
    } else {
        console.log("error:" + cloze + " is not in " + text);
    }

}

module.exports = ClozeCard;