var firstQuestion = 
{
	'questionNumber': 1,
	'timeRemaining': 30,
	'questionScript': "What is Bubba's real full name?",
	'potentialAnswers':
	[
	'Benjamin Buford Blue',
	'Benjamin Buffa Blue',
	'Benjamin Bubba Blue',
	'Benjamin Beaufort Blue'
	],
	"correctAnswer":'Benjamin Buford Blue',
	
	'imageGif':"https://media.giphy.com/media/u29Biz9kyqkFO/giphy.gif",
}
var secondQuestion = 
{
	'questionNumber': 2,
	'timeRemaining': 30,
	'questionScript': "What number bus was Forrest supposed to catch to reach Jenny's house?",
	'potentialAnswers':
	[
	'6',
	'9',
	'19',
	'26'
	],
	"correctAnswer":'9',
	
	'imageGif':"https://media.giphy.com/media/PHFmJ1YBSjDMs/giphy.gif",
}
var thirdQuestion = 
	{
	'questionNumber': '3',
	'timeRemaining': 30,
	'questionScript': "What is Forrest's IQ?",
	'potentialAnswers':
	[
		'65',
		'75',
		'85',
		'155'
	],
	"correctAnswer":'75',
	'imageGif':'https://media.giphy.com/media/EHbWV5FXHKxMY/giphy.gif',
}
var forthQuestion= 
	{
	'questionNumber': '4',
	'timeRemaining': 30,
	'questionScript': "What is the name of the security guard that Forrest speaks to when he reposrts the Watergate burglary?",
	'potentialAnswers':
	[
		'Frank Wills',
		'Luther Willis',
		'Steve Evans',
		'Walter Gate'
	],
	"correctAnswer":'Walter Gate',
	'imageGif':"https://media.giphy.com/media/wRxT9xrYoxw9q/giphy.gif",

	}
var fifthQuestion = 
{
	'questionNumber': '5',
	'timeRemaining': 30,
	'questionScript': "What foods did Forrest use to describe himself and Jenny?",
	'potentialAnswers':
	[
		'Fish & Chips',
		'Peas & Carrots',
		'Meat & Potatoes',
		'Lemosn & Limes'
	],
	"correctAnswer":'Peas & Carrots',
		'imageGif':"https://media.giphy.com/media/kYigEXoyjkkbS/giphy.gif",

	}
var myArray = [firstQuestion, secondQuestion, thirdQuestion,forthQuestion, fifthQuestion];
console.log(myArray.length);
console.log(myArray[2]);
//Set the question to an var that can go anywhere.  Make an function that will adjus the falue of this array. 
var question;
var answer; 
var userInput;
// counter for round Timer  
var counter = 20; 
//global interval ID
var intervalID;
//add my quote to my page every time 
function displayQuestion(){
	console.log(true);
	var startDiv = $('<div>');
		//first adjust the button 
		startDiv.html(function(n){
			return "<h1> "+question.questionScript +"</h1>";
		})
		console.log(question.questionScript);
		startDiv.addClass('col-md-12 marker');
		$('#start').append(startDiv);
		

}
function render(){
	var startDiv = $('#start');
		//first adjust the button 
		startDiv.html(
			"<h1> "+question.questionScript +"</h1>"
		);
	var length = (question.potentialAnswers.length);

	for (var i = 0; i < length ; i ++){
					var btn = $("<button>");
					btn.addClass('col-md-6  temp btn-primary question'+ i);
					btn.attr('data-let', question.potentialAnswers[i]);
					btn.html(question.potentialAnswers[i]);
					$("#start").append(btn);
		}
}// Close Render
//addVideo takes information object Video URL and turns it into a new video 
function changeQuestion(){
	if(myArray.length >0){
		console.log(myArray.length);
		var number = Math.floor(Math.random() * myArray.length);
		question = myArray[number];
		myArray.splice(number, 1);
		console.log(number.length);
		console.log(myArray[number]);
	
		return question;
	}else{
		alert( "The game is over!");
	}
	
}

function displayTimeRunsOut(){
		$('#start').empty();
		displayQuestion(question);
}
function displayImage(){
	var gifUrl = question.imageGif;
	console.log(gifUrl);
	var image = $("<img>");
	image.addClass('img-responsive image')
	image.attr('src', gifUrl);
	$('.marker').append(image);

}
function displayWrongAnswer(){
	var div = $("<div>");
	div.addClass("col-md-12");
	div.html('<h2>' + userInput + " is incorrect! The correctAnswer was " + answer + "! </h2>");
	$('.image').append(div);

	setTimeout(nextQuestion, 8000);

}
function nextQuestion (){
	//call change question to pick a new question
	$('#start').empty();
	changeQuestion();
	//call render to render that question 
	render();

}
$(document).ready(function(){

	$('#startGame').on('click',function(){
		// the the question for this round 
		question = changeQuestion();
		console.log(question);
		displayQuestion(question);
		render(question);
		//Set and display game 
		intervalID = setInterval(function(){
			//reduce counter 
			counter --; 
			//display new counter value 
			$('#timer').html("<h3>" + counter	+" </h2");
			// if = user inform user that they have lost and call a function that will pick a new question. 
			if(counter === 0 ){
				console.log('clearing interval', intervalID);
				displayTimeRunsOut();
				clearInterval(intervalID);
			}
		}, 1000)
		console.log('on start', intervalID);

	})//close Click

	$(document).on('click',".temp", function(){

		// Hold empty timer area
		console.log(question.questionScript);
		$('#timer').html('');
		// clear the timer 
		clearInterval(intervalID);
		//Hold the correct answer
		answer = question.correctAnswer;
		console.log(answer + " answer");
		//Hold the users Answer
		userInput	= $(this).data("let");
		console.log(userInput);
		// Empty the Start Div 
		$('#start').empty();

		displayQuestion(question);
		// Resent the information in the Div
		/*var newDiv = $('<div>');
		newDiv.addClass("col-md-12 result");
		console.log(question.questionScript);
		newDiv.html(function(n){
			return "<h1> "+question.questionScript +"</h1>";
		});
				console.log(newDiv);
		$('#start').append(newDiv);*/
		// Set image.  not dependent on correct answer 
		// Sets the text informing the player whether they have won or lost 
		console.log(userInput);
		console.log(userInput ===answer);
		console.log(answer);
		if (userInput === answer){
			displayImage();
			console.log("got here");
			var div = $("<div>");
			div.addClass("col-md-12");
			console.log(answer);
			div.html('<h2>'+answer + " is correct! you have won this round.</h2>");
			console.log(div);
			$("#start").append(div); 
			setTimeout(nextQuestion, 8000);

		}else{
			displayImage();
			displayWrongAnswer();
			console.log('wrong')
			}

		//Will empty the Temp
		})// close 	

	
})