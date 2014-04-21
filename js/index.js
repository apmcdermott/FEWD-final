// press Start Game, first note set is loaded (so that it's not always the same one on load)
// one of the buttons will be given the class "correct" or smth
// user listens to the sound (or not, whatever idc) and is like hmmm
// user chooses one, clicks a button.
// if it's got the "correct" class, then the user gets a "awesome wooo you winnnn" message and their score goes up
// if it lacks the "correct" class, user gets a O NOES message and their score stays the same
// NEXT button to advance to the next one

// master array contains all the possible options
var masterArray = [
	{steps:0, named:"unison"},
	{steps:1, named:"min2"},
	{steps:2, named:"maj2"},
	{steps:3, named:"min3"},
	{steps:4, named:"maj3"},
	{steps:5, named:"perf4"},
	{steps:6, named:"tritone"},
	{steps:7, named:"perf5"},
	{steps:8, named:"min6"},
	{steps:9, named:"maj6"},
	{steps:10, named:"min7"},
	{steps:11, named:"maj7"},
	{steps:12, named:"octave"}
],mutableMasterArray=[],dynamicArray=[];

// builds an dynamic array based on the IDs of buttons w/ the class "enabled"
	function buildArray() {
		dynamicArray=[];
		$('.button.enabled').each(function(index,element){
			// creates a working copy of the master array
			mutableMasterArray.push.apply(mutableMasterArray, masterArray);
			dynamicArray.push(mutableMasterArray.splice(mutableMasterArray.indexOfIdInObject($(element).attr('id')),1).pop());
		});
		console.log(dynamicArray);
	}

	Array.prototype.indexOfIdInObject=function(id){
		var res=-1;
		this.forEach(function(el,i){
			if(el.named==id || el.steps==id){
				res=i;
			}
		});
		return res;
	};

// 52 is the max, 40 is the min --> these correspond to the audio sample, which are named based on their note's position on an 88-key keyboard
// play the two samples one after another (how do I do this?)
// also needs to compare randNum1 with randNum2 and determine the difference --> "steps" in the array's objects (i.e. 3 steps apart = min3)

var stepDiff = 0;
var intName = "";
function getRandomInterval(){
	dynamicArray
// choose interval, then define notes (reverse from before)
	intName = dynamicArray[Math.round(Math.random()*(dynamicArray.length-1))].named;
	intSteps = dynamicArray[dynamicArray.indexOfIdInObject(intName)].steps;
	var randNum1 = Math.round(Math.random()*(52-40)+40);
	var randNum2 = 0
// shift if it goes off the octave keyboard area
// potential alternate solution: record two buffer octaves-- one above, and one below
// but keep the starting note between 40 and 52
	var intShift = function(start, steps) {
		i = 0;
		if (start + steps <= 52){
			randNum2 = start + (steps-i);
		}
		else {
			intShift (start-1, steps);
			i++;
		}
	}
	intShift(randNum1, intSteps);
	$("#"+intName).addClass('correct');
	$('.sample.first').empty().append('<audio controls><source src="audio/'+randNum1+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum1+'.ogg" type="audio/ogg"> <source src="audio/'+randNum1+'.wav" type="audio/wav"> Your browser does not support the audio element.</audio>');
	$('.sample.second').empty().append('<audio controls><source src="audio/'+randNum2+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum2+'.ogg" type="audio/ogg"> <source src="audio/'+randNum2+'.wav" type="audio/wav"> Your browser does not support the audio element.</audio>');
	console.log(randNum1, randNum2);
}

function reset(){
					$('.button').removeClass('correct');
			getRandomInterval();
		}

$(document).ready(function() {
	$('.gamestart').on('click', function(){
		$(this).toggleClass('hide');
		$(".sample").toggleClass('hide');
		buildArray();
		getRandomInterval();
	});

// "reset" (loads new interval)
	$('#reset').on('click', function(){
		reset()
	});

// enable/disable options
	if ($(".enabled").length > 0){
	//if the user clicks on a <i> with fa-check-square-o, then the <i> class changes to fa-square-o and the button is given the "disabled" class
		$('i.fa-fw').on('click', function(){
			$(this).toggleClass('fa-check-square-o').toggleClass('fa-square-o').siblings('button').toggleClass('enabled').toggleClass('disabled');
			buildArray();
			getRandomInterval();
		});
	}
	else {
		$('i.fa-fw').on('click', function(){
			alert("You have to choose at least one!");
		});
	}

	// in/correct selection and reset
	$('.button.enabled').on('click', function(){
		if ($(this).hasClass('correct')){
			alert("Correct! You win at music!")
			reset();
		}
		else {
			alert("Try again.");
		}
	});

});
