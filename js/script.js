import getQuestions from './questions.js';

//initial data
let currentNumberOfQuestion = 0;
let correctAnswers = 0;
let numberOfQuestion = 1;
let answers = [];

//const
const questions = getQuestions();

const progressBar = document.querySelector(".progress-bar");
const questionArea = document.querySelector(".questionArea");
const scoreArea = document.querySelector(".scoreArea");
const scoreHeader = document.querySelector(".scoreHeader");
const scoreColor = document.querySelector(".scoreColor");

const redColor = "#f00000";
const greenColor = "#7FFF00";

showQuestion();

//reset event
document.querySelector(".scoreArea #retryButton").addEventListener("click", () => {
    currentNumberOfQuestion = 0;
    correctAnswers = 0;
    numberOfQuestion = 1;
    answers = [];
    showQuestion();

    document.getElementById("correctAnswer").style.display = 'none';
    document.getElementById("falseAnswer").style.display = 'none';

});

//progressBarFunction
function progressBarFunction(currentNumberOfQuestion, questions) {
    return Math.floor((currentNumberOfQuestion / questions.length) * 100);
}

//display functions
function displayScoreAreaBlock() {
    scoreArea.style.display = "block";
    questionArea.style.display = "none";
    progressBar.style.width = "100%";
}

function displayScoreAreaNone() {
    scoreArea.style.display = "none";
    questionArea.style.display = "block";
}

//quiz result functions
function passed() {
    scoreHeader.innerHTML = "Passed!";
    scoreHeader.style.color = greenColor;
    scoreColor.style.color = greenColor;
}

function notPassed() {
    scoreHeader.innerHTML = "Not passed!";
    scoreHeader.style.color = redColor;
    scoreColor.style.color = redColor;
}

//quiz show result
function showResult(points, correctAnswers, questions) {
    scoreColor.innerHTML = `${points}% Correct`;
    document.querySelector(
        ".scoreText"
    ).innerHTML = `${correctAnswers} of ${questions.length}  is correct!`;

    document.querySelector(".answers").innerHTML = "<br/> Answers: <br/>" + answers;
}

//show question
function showQuestion() {
    if (questions[currentNumberOfQuestion]) {
        let currentQuestion = questions[currentNumberOfQuestion];

        progressBar.style.width = `${progressBarFunction(currentNumberOfQuestion, questions)}%`;

        displayScoreAreaNone();

        document.querySelector(".question").innerHTML = numberOfQuestion + ". " + currentQuestion.question;

        let optionsHtml = "";

        for (let indexOfQuestion in currentQuestion.options) {
            optionsHtml += `<div data-op="${indexOfQuestion}" class="option"> ${currentQuestion.options[indexOfQuestion]}</div>`;
        }

        document.querySelector(".options").innerHTML = optionsHtml;

        document.querySelectorAll(".options .option").forEach((item) => {
            item.addEventListener("click", optionsClickEvent);
        });

    } else {
        finishQuiz();
    }
}

//click event
function optionsClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute("data-op"));

    if (questions[currentNumberOfQuestion].answer === clickedOption) {
        correctAnswers++;
        
        document.getElementById("correctAnswer").style.display = 'block';
        document.getElementById("falseAnswer").style.display = 'none';

        answers.push("<br/>" + numberOfQuestion + ". " + questions[currentNumberOfQuestion].options[clickedOption]);
    }

    else {
        document.getElementById("correctAnswer").style.display = 'none';
        document.getElementById("falseAnswer").style.display = 'block';
    }
    currentNumberOfQuestion++;
    numberOfQuestion++;
    showQuestion();
}

//finish quiz
function finishQuiz() {
    let points = progressBarFunction(correctAnswers, questions);

    if (points < 50) {
        notPassed();
    } else if (points >= 50) {
        passed();
    } 
    
    showResult(points, correctAnswers, questions)
    displayScoreAreaBlock();
}