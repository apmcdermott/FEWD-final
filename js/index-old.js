// press Start Game, first note set is loaded (so that it's not always the same one on load)
// one of the buttons will be given the class "correct" or smth
// user listens to the sound (or not, whatever idc) and is like hmmm
// user chooses one, clicks a button.
// if it's got the "correct" class, then the user gets a "awesome wooo you winnnn" message and their score goes up
// if it lacks the "correct" class, user gets a O NOES message and their score stays the same
// NEXT button to advance to the next one

//master array with all the options, even if they're disabled
var master = ["audio/min2","audio/maj2","audio/min3","audio/maj3"];

// builds an adaptive array depending on what the user has enabled/disabled
function buildArray() {
	var availableIntervals = master;
	if ($('#min2').hasClass('enabled')) {
		 
	}
}

function getRandomInterval() {
	var randomNumber = Math.floor(Math.random() * 100);
	var activeInterval = intervals[0];
	if (randomNumber < 25) {
		$('.sample').html('<source src="'+intervals[0]+'.mp3" type="audio/mpeg"> <source src="'+intervals[0]+'.ogg" type="audio/ogg"> Your browser does not support the audio element.');
	}
	else if (randomNumber < 50) {
		$('.sample').html('<source src="'+intervals[1]+'.mp3" type="audio/mpeg"> <source src="'+intervals[1]+'.ogg" type="audio/ogg"> Your browser does not support the audio element.');
	}
	else if (randomNumber < 75) {
		$('.sample').html('<source src="'+intervals[2]+'.mp3" type="audio/mpeg"> <source src="'+intervals[2]+'.ogg" type="audio/ogg"> Your browser does not support the audio element.');
	}
	else if (randomNumber < 100) {
		$('.sample').html('<source src="'+intervals[3]+'.mp3" type="audio/mpeg"> <source src="'+intervals[3]+'.ogg" type="audio/ogg"> Your browser does not support the audio element.');
	}
}


$(document).ready(function() {

	$('.gamestart').on('click', function(){
		$(this).toggleClass('hide');
		$("audio").toggleClass('hide');
		getRandomInterval();
	});

	//if the user clicks on a <i> with fa-check-square-o, then the <i> class changes to fa-square-o and the button is given the "disabled" class
	$('i').on('click', function(){
		$(this).toggleClass('fa-check-square-o').toggleClass('fa-square-o').parent().toggleClass('enabled').toggleClass('disabled');
	});
	// the availableIntervals array is rebuilt with only the intervals w/o the "disabled" class

});