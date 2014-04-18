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
		$('button.enabled').each(function(index,element){
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
	if (dynamicArray.length > 1){
		var randNum1 = Math.floor(Math.random()*(dynamicArray.length)+40);
		var randNum2 = Math.floor(Math.random()*(dynamicArray.length)+40);
		stepDiff = randNum1 - randNum2;
		var intName=dynamicArray[Math.abs(dynamicArray.indexOfIdInObject(stepDiff))].named;
	}
// ISSUE: if there's only 1 interval selected, shit goes weird. Potential solution follows. It's messy tho :-/
	else {
		var randNum1 = Math.floor(Math.random()*((52-dynamicArray[0].steps)-40+1)+40);
		var randNum2 = randNum1 + dynamicArray[0].steps;
		var intName=dynamicArray[0].named;
	}
	$("#"+intName).addClass('correct');
	$('.sample.first').empty().append('<audio controls><source src="audio/'+randNum1+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum1+'.ogg" type="audio/ogg"> <source src="audio/'+randNum1+'.wav" type="audio/wav"> Your browser does not support the audio element.</audio>');
	$('.sample.second').empty().append('<audio controls><source src="audio/'+randNum2+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum2+'.ogg" type="audio/ogg"> <source src="audio/'+randNum2+'.wav" type="audio/wav"> Your browser does not support the audio element.</audio>');
//	console.log(randNum1, randNum2);
}

// on click, needs to remove all "correct" classes
$(document).ready(function() {
	$('.gamestart').on('click', function(){
		$(this).toggleClass('hide');
		$(".sample").toggleClass('hide');
		buildArray();
		getRandomInterval();
	});

	if ($(".enabled").length > 0){
	//if the user clicks on a <i> with fa-check-square-o, then the <i> class changes to fa-square-o and the button is given the "disabled" class
		$('i.fa-fw').on('click', function(){
			$(this).toggleClass('fa-check-square-o').toggleClass('fa-square-o').parent().toggleClass('enabled').toggleClass('disabled');
			buildArray();
			getRandomInterval();
		});
	}
	else {
		$('i.fa-fw').on('click', function(){
			alert("You have to choose at least one!");
		});
	}



});
