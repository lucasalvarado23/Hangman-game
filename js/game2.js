function getUserWords() {
	var newBlock = prompt("What word would you like to guess?");
	if (newBlock == "") {
		alert("Please enter a word");
		getUserWords();
	} else {
		HANG.saveBlock(newBlock);
	}

}

getUserWords();

setTimeout(function() {
	HANG.getGuess();
}, 100);
