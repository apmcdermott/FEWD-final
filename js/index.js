// press Start Game, first note set is loaded (so that it's not always the same one on load)
// one of the buttons will be given the class "correct" or smth
// user listens to the sound (or not, whatever idc) and is like hmmm
// user chooses one, clicks a button.
// if it's got the "correct" class, then the user gets a "awesome wooo you winnnn" message and their score goes up
// if it lacks the "correct" class, user gets a O NOES message and their score stays the same
// NEXT button to advance to the next one

// master array contains all the possible options
var masterArray = [
	{steps:0, name:"unison"},
	{steps:1, name:"min2"},
	{steps:2, name:"maj2"},
	{steps:3, name:"min3"},
	{steps:4, name:"maj3"},
	{steps:5, name:"perf4"},
	{steps:6, name:"tritone"},
	{steps:7, name:"perf5"},
	{steps:8, name:"min6"},
	{steps:9, name:"maj6"},
	{steps:10, name:"min7"},
	{steps:11, name:"maj7"},
	{steps:12, name:"octave"}
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
		if(el.name==id){
			res=i;
		}
	});
	return res;
};

// 52 is the max, 40 is the min --> these correspond to the audio sample, which are named based on their note's position on an 88-key keyboard
function getRandomSample(){
	var randNum1 = Math.floor(Math.random()*(52-40+1)+40);
	$('.sample.first').html('<source src="audio/'+randNum1+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum1+'.ogg" type="audio/ogg"> <source src="audio/'+randNum1+'.wav" type="audio/wav"> Your browser does not support the audio element.');
	var randNum2 = Math.floor(Math.random()*(52-40+1)+40);
	$('.sample.second').html('<source src="audio/'+randNum2+'.mp3" type="audio/mpeg"> <source src="audio/'+randNum2+'.ogg" type="audio/ogg"> <source src="audio/'+randNum2+'.wav" type="audio/wav"> Your browser does not support the audio element.');
}

// play the two samples one after another (how do I do this?)
function getRandomInterval() {
	getRandomSample();
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
		buildArray();
	});
	// the dynamicArray is rebuilt with only the intervals w/ the "enabled" class

});