// variables to get elements from html
var timeLeft = 60;
var timerID;
var timerEl = document.getElementById('timer');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerEl = document.getElementById('question-container');
var startContainerEl = document.getElementById('start-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var checkAnswerEl = document.getElementById('check-answer');
var viewHighScores = document.getElementById('highscores-link');
var submitButton = document.getElementById('submit-btn');
var clearScoreButton = document.getElementById('clear-btn');
var initialsField = document.getElementById('player-name');
var restartButton = document.getElementById('restart-btn');
var scoreField = document.getElementById('player-score');
var scores = JSON.parse(localStorage.getItem('scores')) || [];
var shuffledQuestions, currentQuestionIndex;

// start game button
startButton.addEventListener('click', startGame);

// next question button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Countdown timer
function timeTick() {
    timeLeft--;
    timerEl.textContent = 'Time: ' + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

// Start Quiz
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add('d-none');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('d-none');
    timeTick();
    setNextQuestion();
};

// next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// show questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.classList.add('text-center')
        button.classList.add('m-3')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

// restart quiz
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('d-none')
    checkAnswerEl.classList.add('d-none')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove('d-none')
    if (correct) {
        checkAnswerEl.innerHTML = 'Correct!';
    } else {
        checkAnswerEl.innerHTML = 'Incorrect.';
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('d-none')
        checkAnswerEl.classList.remove('d-none')
    } else {
        startButton.classList.remove('d-none')
        saveScore();
    }
};

// checks questions and sets colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

// Remove right wrong classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

// Save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = 'Time: ' + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add('d-none');
        document.getElementById('score-container').classList.remove('d-none');
        document.getElementById('your-score').textContent = 'Your final score is ' + timeLeft;

    }, 2000)
};

var loadScores = function () {
    // Get score from local storage
    if (!savedScores) {
        return false;
    }
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector('#initials-field').value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)
    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

// Show high scores
function showHighScores(initials) {
    document.getElementById('highscores').classList.remove('d-none')
    document.getElementById('score-container').classList.add('d-none');
    startContainerEl.classList.add('d-none');
    questionContainerEl.classList.add('d-none');
    if (typeof initials == 'string') {
        var score = {
            initials,
            timeLeft
        }
        scores.push(score)
    }
    var highScoreEl = document.getElementById('highscore');
    highScoreEl.innerHTML = '';
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement('div');
        div1.setAttribute('class', 'h4 text-center col-6 border-bottom border-2 border-secondary');
        div1.innerText = scores[i].initials;
        var div2 = document.createElement('div');
        div2.setAttribute('class', 'h4 text-center col-6 border-bottom border-2 border-secondary');
        div2.innerText = scores[i].timeLeft;
        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }
    localStorage.setItem('scores', JSON.stringify(scores));
};

// view high-scores
viewHighScores.addEventListener('click', showHighScores);

//enter initals
submitButton.addEventListener('click', function (event) {
    event.preventDefault()
    var initials = document.querySelector('#initials-field').value;
    showHighScores(initials);
});


// restart quiz
restartButton.addEventListener('click', function () {
    window.location.reload();
});

// Clear localStorage
clearScoreButton.addEventListener('click', function () {
    localStorage.clear();
    document.getElementById('highscore').innerHTML = '';
});