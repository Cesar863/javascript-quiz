var beginBtn = document.querySelector(".beginBtn button");
var card = document.querySelector(".card");
var quitBtn = card.querySelector(".buttons .quit");
var contBtn = card.querySelector(".buttons .restart");
var quizCard = document.querySelector(".quizCard");
var resultsCard = document.querySelector(".resultsCard");
var qAnswer = document.querySelector(".qAnswer");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");

// Questions pulled from w3 schools https://www.w3schools.com/js/js_quiz.asp
var questions = [
    {
        number: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "script",
        options: [
            "javascript",
            "script",
            "js",
            "scripting"
        ]
    },
    {
        number: 2,
        question: "Where is the correct place to insert a JavaScript?",
        answer: "both the 'HEAD' section and the 'BODY' section are correct",
        options: [
            "both the 'HEAD' section and the 'BODY' section are correct",
            "the 'BODY' section",
            "the 'HEAD' section",
            "the 'META section"
        ]
    },
    {
        number: 3,
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answer: "script src=",
        options: [
            "script src=",
            "script href=",
            "script name=",
            "script class="
        ]
    },
    {
        number: 4,
        question: "How do you write 'hello world' in an alert box?",
        answer: "alert('hello world');",
        options: [
            "alertBox('hello world');",
            "alert('hello world');",
            "msg('hello world');",
            "msgbox('hello world');"
        ]
    },
    {
        number: 5,
        question: "How do you create a function named 'myFunction'?",
        answer: "function myFunction()",
        options: [
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()",
            "var = myFunction()"
        ]
    },
    {
        number: 6,
        question: "How do you call a function named 'myFunction'",
        answer: "myFunction()",
        options: [
            "myFunction()",
            "call myFunction()",
            "call function myFunction()",
            "var call my function"
        ]
    },
    {
        number: 7,
        question: "How to write and IF statement in javaScript",
        answer: "if(i==5)",
        options: [
            "if i===5 then",
            "if i==5 then",
            "if i=5",
            "if(i==5)"
        ]
    },
    {
        number: 8,
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5",
        answer: "if (i!=5)",
        options: [
            "if !=!5 then",
            "if i<> 5",
            "if (i!=5)",
            "if (<> 5)"
        ]
    },
    {
        number: 9,
        question: "how does a WHILE loop start?",
        answer: "while (i <= 10)",
        options: [
            "if (else)(why) function (while)",
            "while (i <= 10)",
            "while i = 1 to 10",
            "while (i<=10;i++)"
        ]
    },
    {
        number: 10,
        question: "How can you add a comment in a JavaScript",
        answer: "//This is a comment",
        options: [
            "//This is a comment",
            "'This is a comment'",
            "!--This is a comment --",
            "~this is a comment~"
        ]
    }
];

beginBtn.onclick = () => {
    card.classList.add("activeCardListEl"); //show cardListEl box
}



// if continueQuiz button clicked
contBtn.onclick = () => {
    card.classList.remove("activeCardListEl"); //hide cardListEl box
    quizCard.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    qCounter(1); //passing 1 parameter to qCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

var timeValue = 15;
var questionProgress = 0;
var questionNumber = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

var tryAgain = resultsCard.querySelector(".buttons .restart");
var exitQuiz = resultsCard.querySelector(".buttons .quit");

// if restartQuiz button clicked
tryAgain.onclick = () => {
    quizCard.classList.add("activeQuiz"); //show quiz box
    resultsCard.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    questionProgress = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionProgress); //calling showQestions function
    qCounter(questionNumber); //passing questionNumber value to qCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    nextBtn.classList.remove("show"); //hide the next button
}



// if quitQuiz button clicked
exitQuiz.onclick = () => {
    window.location.reload(); //reload the current window
}

var nextBtn = document.querySelector("footer .nextBtn");
var questionCounter = document.querySelector("footer .qCounter");

// if Next Que button clicked
nextBtn.onclick = () => {
    if (questionProgress < questions.length - 1) { //if question count is less than total question length
        questionProgress++; //increment the questionProgress value
        questionNumber++; //increment the questionNumber value
        showQuestions(questionProgress); //calling showQestions function
        qCounter(questionNumber); //passing questionNumber value to qCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        nextBtn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuestions(index) {
    var qQuestion = document.querySelector(".qQuestion");

    //creating a new span and div tag for question and option and passing the value using array index
    var qSection = '<span>' + questions[index].number + ". " + questions[index].question + '</span>';
    var aSection = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    qQuestion.innerHTML = qSection; //adding new span tag inside qSection
    qAnswer.innerHTML = aSection; //adding new div tag inside aSection

    var option = qAnswer.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if exitQuiz button clicked
quitBtn.onclick = () => {
    card.classList.remove("activeCardListEl"); //hide cardListEl box
}

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    var userAns = answer.textContent; //getting user selected option
    var correctAns = questions[questionProgress].answer; //getting correct answer from array
    var allOptions = qAnswer.children.length; //getting all option items

    if (userAns == correctAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (qAnswer.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer 
                qAnswer.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                qAnswer.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        qAnswer.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    nextBtn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    card.classList.remove("activeCardListEl"); //hide cardListEl box
    quizCard.classList.remove("activeQuiz"); //hide quiz box
    resultsCard.classList.add("activeResult"); //show result box
    var scoreText = resultsCard.querySelector(".resultsCardScore");
    if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        var scoreTag = '<span>and congrats! ðŸŽ‰, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside resultsCardScore
    }
    else if (userScore > 1) { // if user scored more than 1
        var scoreTag = '<span>and nice ðŸ˜Ž, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        var scoreTag = '<span>and sorry ðŸ˜, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            var addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            var allOptions = qAnswer.children.length; //getting all option items
            var correctAns = questions[questionProgress].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (qAnswer.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer
                    qAnswer.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    qAnswer.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                qAnswer.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            nextBtn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function qCounter(index) {
    //creating a new span tag and passing the question number and total question
    var totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    questionCounter.innerHTML = totalQueCounTag;  //adding new span tag inside questionCounter
}

