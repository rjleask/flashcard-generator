var ClozeCard = require('./clozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');
makeCardsWithPrompt();
function makeCardsWithPrompt(){
inquirer.prompt([{
        name: "fulltext",
        message: "Write the question and answer for your card: "
    }, {
        name: "front",
        message: "Write only the question to your card: "
    },
    {
        name: "back",
        message: "Write only the answer to your card: "
    },
    {
        name: "nameOfCard",
        message: "Give a title to the flash card: "
    },
    {
    	name:'add',
        type: "confirm",
        message: "Do you want to make another flash card? "
    }
]).then(function(answers) {
	// empty object to hold each new userinput
	var dynamicVariable = {};
	// access that index and assign the Cloze Card object to it
    dynamicVariable[answers.nameOfCard] = new ClozeCard(answers.fulltext, answers.back);
    // push this object to the cardArr[]
    dynamicVariable[answers.nameOfCard].addBasicCards(answers.front, answers.back);
    // loop through and log each index to the flashCard txt file
    for (var i =0; i<dynamicVariable[answers.nameOfCard].cardArr.length;i++){
    logData(answers.nameOfCard,dynamicVariable[answers.nameOfCard].cardArr[i]);
}

    if(answers.add === true){
		makeCardsWithPrompt();
	}
	else{
		console.log("----------------------");
		console.log("Flash Card: "+answers.nameOfCard)
		console.log("Full question and answer: "+dynamicVariable[answers.nameOfCard].fullText);
		console.log("Partial question: "+dynamicVariable[answers.nameOfCard].partial);
		console.log("Answer: "+dynamicVariable[answers.nameOfCard].cloze);
	}

});
}

function logData(name,keyword) {
    // console.log(keyword);
    fs.appendFile('cardsLog.txt',name+':'+JSON.stringify(keyword) + '\r\n', function(err) {
        if (err) {
            console.log(err);
        }
    });
}