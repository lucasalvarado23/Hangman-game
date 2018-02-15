var mainBlock;
var countRemain;
var guessRemain;
var guessed = new Array();

var HANG = {
	saveBlock: function(block) {
		mainBlock = block;
		
		countRemain = this.getBlock().length;
		guessRemain = 10;
		
		var splitBlock = block.split('');
		
		for (x in splitBlock) {
			if (splitBlock[x] != ' ') {
				$("#words").append("<c class='word-letter'>" + splitBlock[x] + "</c>");
			} else {
				$("#words").append("&nbsp; &nbsp;");
			}
		}
	},
	
	getBlock: function() {
		return mainBlock.split(' ').join('').toLowerCase().split('');
	},
	
	getWords: function() {
		return mainBlock.split(' ');
	},
	
	getGuess: function() {
		var myGuess = prompt("Pick a letter!").toLowerCase();
		
		if (myGuess == "") {
			alert("Enter something... Anything please!");
			this.getGuess();
		}
		
		var currentBlock = this.getBlock();
		
		//Loop through each letter and if there is a match change the color
		
		$.each($(".word-letter"), function() {
			if ($(this).html().toLowerCase() === myGuess) {
				$(this).addClass("word-active");
			}
		});
		
		if (currentBlock.indexOf(myGuess) >= 0) {
			guessed.push(myGuess);
			var numInstances = 0;
			for (var i = 0; i <= currentBlock.length; i++) {
				if (currentBlock[i] === myGuess) {
					numInstances++;
					countRemain--;
				}
			}
			
			alert("Great guess!");
			
			if (countRemain > 0 && guessRemain > 0) {
				this.getGuess();
			} else if (countRemain > 0 && guessRemain === 0) {
				alert("No more guesses! You lose! :(");
				return false;
			} else if (countRemain === 0 && guessRemain > 0) {
				alert("You win! It was " + mainBlock);
				return false;
			}
			
		} else {
			if (guessed.indexOf(myGuess) >= 0) {
				alert("You already guessed that letter...");
				this.getGuess();
			} else {
				guessed.push(myGuess);
				
				guessRemain--;
				
				$("#guessed-words").append("<myletter>" + myGuess.toUpperCase() + "</myletter>");
				
				if (guessRemain === 0) {
					alert("No more guesses! You lose! :(");
					return false;
				} else {
					alert("Sorry... You guessed wrong.");
					setTimeout(function() {
						HANG.getGuess();
					}, 200);
				}
			}			
		}
	}
};