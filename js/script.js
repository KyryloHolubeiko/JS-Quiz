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

const showAnswer = document.getElementById("answer");

const RED_COLOR = "#f00000";
const GREEN_COLOR = "#7FFF00";

//show question
const showQuestion = () => {
    if (questions[currentNumberOfQuestion]) {
        let currentQuestion = questions[currentNumberOfQuestion];

        progressBar.style.width = `${getProgressBar(currentNumberOfQuestion, questions)}%`;

        getDisplayNoneStyle();

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
const optionsClickEvent = (e) => {
    let clickedOption = parseInt(e.target.getAttribute("data-op"));
    if (questions[currentNumberOfQuestion].answer === clickedOption) {
        correctAnswers++;
        document.getElementById("answer").innerHTML = "Correct!";
        document.getElementById("answer").style.color = GREEN_COLOR;

        answers.push("<br/>" + numberOfQuestion + ". " + questions[currentNumberOfQuestion].options[clickedOption]);

        document.querySelector(`[data-op="${clickedOption}"]`).style.backgroundColor = GREEN_COLOR;

    } else {
        document.querySelector(`[data-op="${clickedOption}"]`).style.backgroundColor = RED_COLOR;
        document.getElementById("answer").innerHTML = "Incorrect!";
        document.getElementById("answer").style.color = RED_COLOR;
    }
    document.getElementById("moveNext").disabled = false;

    document.querySelectorAll(".options .option").forEach((item) => {
        item.removeEventListener("click", optionsClickEvent);
    });
}

//getProgressBar
const getProgressBar = (currentNumberOfQuestion, questions) => {
    return Math.floor((currentNumberOfQuestion / questions.length) * 100);
}

//display styles
const getDisplayBlockStyle = () => {
    scoreArea.style.display = "block";
    questionArea.style.display = "none";
    progressBar.style.width = "100%";
}

const getDisplayNoneStyle = () => {
    scoreArea.style.display = "none";
    questionArea.style.display = "block";
}

showQuestion();

//click Events
document.addEventListener('click', (event) => {
    console.log(event.target.id);
    switch (event.target.id) {
        
        case 'showCorrect':
            if (showAnswer.style.display === 'none') {
                document.getElementById("answer").style.display = 'block';
            } else
                showAnswer.style.display = "none";
            break;

        case 'moveNext': 
        showAnswer.innerHTML = "";
            currentNumberOfQuestion++;
            numberOfQuestion++;
            document.getElementById("moveNext").disabled = true;
            showQuestion();
            break;

        case 'retryButton':
            currentNumberOfQuestion = 0;
            correctAnswers = 0;
            numberOfQuestion = 1;
            answers = [];
            showAnswer.innerHTML = "";
            showQuestion();
            break;
    }
});

//quiz show result
const showResult = (points, correctAnswers, questions) => {
    scoreColor.innerHTML = `${points}% Correct`;
    document.querySelector(
        ".scoreText"
    ).innerHTML = `${correctAnswers} of ${questions.length}  is correct!`;

    document.querySelector(".answers").innerHTML = "<br/> Answers: <br/>" + answers;
}

//finish quiz
const finishQuiz = () => {
    let points = getProgressBar(correctAnswers, questions);

    if (points < 50) {
        notPassed();
    } else if (points >= 50) {
        passed();
    }

    showResult(points, correctAnswers, questions)
    
    getDisplayBlockStyle();
}

//quiz result functions
const passed = () => {
    scoreHeader.innerHTML = "Passed!";
    scoreHeader.style.color = GREEN_COLOR;
    scoreColor.style.color = GREEN_COLOR;
}

const notPassed = () => {
    scoreHeader.innerHTML = "Not passed!";
    scoreHeader.style.color = RED_COLOR;
    scoreColor.style.color = RED_COLOR;
}