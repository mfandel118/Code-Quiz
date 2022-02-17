// When the "START QUIZ" button is pressed, the Quiz begins ✅ 
// When the "START QUIZ" button is pressed, the Timer begins ✅ 

// When Quiz begins, the frist question and possible answers are rendered on the screen ✅ 

// When the first question is answered the next question and possible answers are rendered ✅ 
// When the first question is answered, an alert on the screen indicates "Right" or "Wrong" ✅ 

// A tally is kept of how many correct answers the user gets which represents their score ✅ 

// New questions/possible answers are rendered after each question is answered ✅ 

// If a question is answered wrong, 10 seconds is subtracted from the clock ✅ 

// After the Timer runs out, the user's score is rendered on the screen ✅ 
// After the Timer runs out, the user is prompted to enter their initials ✅ 

// If the last question is answered with time remaining, the user's score is rendered ✅ 

// After the user enters their initials, it is saved to localStorage with their score ✅ 
// After the user enters their initials, the list of high scores are rendered on the screen ✅ 

// When the highscores are displayed, the user is prompted to Try Again ✅ 

// When the user clicks "Try Again" the Quiz starts over again ✅ 



var questionsList = ["What does HTML stand for?", 
"What does CSS stand for?", 
"In JavaScript, what is a function inside of an object called?",
"In CSS, what does a '.' indicate?",
"What does API stand for?",
"In HTML, what element tag is used to insert a picture?",
"Which of the following is an example of the Camel Case naming convention?",
"What does DOM stand for in JavaScript?",
"What symbol represents a jQuery function?",
"In JavaScript, the first item in an array is indicated by what index position?"
];

var choice1List = [
"Helpful Tips Make Learners",
"Colorful Style Simulator",
"Method",
"Universal Selector",
"Application Programming Interface",
"<pic>",
"CoDiNg Is So MuCh FuN",
"Day Of the Month",
"%",
"[0]"
];

var choice2List = [
"HyperText Markup Language",
"Ciao, Says Steve",
"Inside Function",
"ID Selector",
"All Purpose Internet",
"<img>",
"everyoneLOVEStoCODE",
"Directory Of Methods",
"$",
"[1]"
];

var choice3List = [
"Hip To Many Languages",
"Captivating Style Sheets",
"Object Function",
"Class Selector",
"Actual Programming Intelligence",
"<picture>",
"CaMeLsHaVeHuMpS",
"Document Object Model",
"*",
"[-1]"
];

var choice4List = [
"Hi There, My Lady",
"Cascading Style Sheets",
"Variable",
"Element Selector",
"Accruing Points Infinitely",
"<image>",
"wednesdayIsHumpDay",
"Duck Or Move",
"~",
"[00]"
];

// Correct Answers:
// 1.  choice2
// 2.  choice4
// 3.  choice1
// 4.  choice3
// 5.  choice1
// 6.  choice2
// 7.  choice4
// 8.  choice3
// 9.  choice2
// 10. choice1

var correctAnswers = [
"HyperText Markup Language",
"Cascading Style Sheets",
"Method",
"Class Selector",
"Application Programming Interface",
"<img>",
"wednesdayIsHumpDay",
"Document Object Model",
"$",
"[0]"
]

var questionText = document.querySelector(".question");
var startBtn = document.querySelector(".start");
var choice1Btn = document.querySelector(".choice1");
var choice2Btn = document.querySelector(".choice2");
var choice3Btn = document.querySelector(".choice3");
var choice4Btn = document.querySelector(".choice4");
var submitBtn = document.querySelector(".submit")
var tryAgainBtn = document.querySelector(".try-again");
var alert = document.querySelector(".alert");
var timerText = document.querySelector(".timer");
var userScore = document.querySelector(".user-score");
var initialsForm = document.querySelector(".form-text");
var scoresList = document.querySelector(".scores");

var allButtons = document.querySelectorAll(".choice");

var timer = 60;
var score = 0;

var questionsIndex = 0;
var choice1Index = 0;
var choice2Index = 0;
var choice3Index = 0;
var choice4Index = 0;

var savedScores = JSON.parse(localStorage.getItem("score")) || [];

// Function for start of page - hiding Quiz elements until Quiz is started
function init() {
    choice1Btn.style.display = "none";
    choice2Btn.style.display = "none";
    choice3Btn.style.display = "none";
    choice4Btn.style.display = "none";
    alert.style.display = "none";
    tryAgainBtn.style.display = "none";
    initialsForm.style.display = "none";
    submitBtn.style.display = "none";
    scoresList.style.display = "none";
};

// Call function for initial page settings
init();

// Function to render new question & answers
function renderQuestion() {
    questionText.textContent = questionsList[questionsIndex];
    choice1Btn.textContent = choice1List[choice1Index];
    choice2Btn.textContent = choice2List[choice2Index];
    choice3Btn.textContent = choice3List[choice3Index];
    choice4Btn.textContent = choice4List[choice4Index];

    for (var i=0;i < allButtons.length; i++) {
        var buttons = allButtons[i];
        buttons.addEventListener("click",nextQuestion);
    };
};

function nextQuestion(event) {
    // if correct, alert "Right"; if incorrect, alert "Wrong"
    alert.style.display = "block";
    if (event.target.textContent === correctAnswers[questionsIndex]) {
        alert.textContent = "Right!";
        score+=10;
    } else {
        alert.textContent = "Wrong!";
        timer-=10;
    };
    questionsIndex++;
    choice1Index++;
    choice2Index++;
    choice3Index++;
    choice4Index++;
    renderQuestion();

    if (questionsIndex >= questionsList.length) {
        endQuiz();
    };
};

// Event Listener to execute function that begins Quiz
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    // Hide Start Button
    startBtn.style.display = "none";

    // Call function to Render Question & Answers
    renderQuestion();

    // Make buttons for possible choices visible
    choice1Btn.style.display = "block";
    choice2Btn.style.display = "block";
    choice3Btn.style.display = "block";
    choice4Btn.style.display = "block";

    // Start Timer for Quiz
    startTimer();
}

// Function to start timer
function startTimer() {
var quizTimer = setInterval(() => {
        timer--;
        timerText.textContent = timer;
        if (timer <= 0) {
            clearInterval(quizTimer);
            endQuiz();
        };
    }, 1000); 
};

// Function for End of Quiz, rendering Score and prompting user to enter initials
function endQuiz() {
    questionText.style.display = "none";
    choice1Btn.style.display = "none";
    choice2Btn.style.display = "none";
    choice3Btn.style.display = "none";
    choice4Btn.style.display = "none";
    timerText.style.display = "none";
    alert.style.display = "none";

    userScore.style.display = "block";
    userScore.textContent = "Great job! You scored " + score + " points!";

    initialsForm.style.display = "block";
    submitBtn.style.display = "block";
}

// Event Listener to save user initials and score to local storage
submitBtn.addEventListener("click",saveInits)
function saveInits() {
    var userInits = initialsForm.value;
    var userObject = {
        userInits,
        score
    };

    savedScores.push(userObject);

    // localStorage.setItem("initials", userInits);
    // localStorage.setItem("score", score);

    localStorage.setItem("score",JSON.stringify(savedScores))

    highScores();
};

// Function to render list of High Scores
function highScores() {
    for (var i=0; i < savedScores.length; i++) {
        var scoresEl = savedScores[i];
        var newScoresList = document.createElement("li");
        newScoresList.textContent = scoresEl.score + " Points" + " - " + scoresEl.userInits;
        scoresList.appendChild(newScoresList);
    };

    initialsForm.style.display = "none";
    submitBtn.style.display = "none";
    timerText.style.display = "none";
    userScore.style.display = "none";

    scoresList.style.display = "block";
    tryAgainBtn.style.display = "block";
};

// Event Listener to start quiz from the beginning 
tryAgainBtn.addEventListener("click", retryQuiz)
function retryQuiz() {
    tryAgainBtn.style.display = "none";
    scoresList.style.display = "none";

    questionsIndex = 0;
    choice1Index = 0;
    choice2Index = 0;
    choice3Index = 0;
    choice4Index = 0;
    timer = 60;
    score = 0;

    questionText.style.display = "block";
    choice1Btn.style.display = "block";
    choice2Btn.style.display = "block";
    choice3Btn.style.display = "block";
    choice4Btn.style.display = "block";
    timerText.style.display = "block";

    renderQuestion();
    startTimer();
};