// Questions
let questions = [
    {
        question: 'How to write a "Hello World" in an alertbox?',
        options: [
            'alertBox("Hello World")',
            'msgBox("Hello World")',
            'msg("Hello World")',
            'alert("Hello World")'
        ],
        answer: 3
    },
    {
        question: "How do you create a function in Javascript?",
        options: [
            "function:myFunction()",
            "function = myFunction()",
            "function myFunction()"
        ],
        answer: 2
    },
    {
        question: 'How to call a function called "myFunction"?',
        options: ["call myFunction", "call function myFunction", "myFunction()"],
        answer: 2
    },
    {
        question: "How to write an IF conditional in Javascript?",
        options: ["if i = 5", "if i == 5 then", "if (i == 5)", "if i = 5 then"],
        answer: 2
    },
    {
        question: 'How to make an if that executes code if "i" is different from 5',
        options: ["if (i != 5)", "if (i <> 5)", "if i <> 5", "if i =! 5 then"],
        answer: 0
    },
    {
        question: "How the while loop starts?",
        options: ["while (i <= 10)", "while (i <= 10; i++)", "while i = 1 to 10"],
        answer: 0
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "script",
            "javascript",
            "scripting",
            "js"],
        answer: 0
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?",
        options: [
            "1",
            "2",
            "3",
            "document.getElementById(`demo`).innerHTML = `Hello world!`"
        ],
        answer: 3
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        options: [
            "Both the `head` section and the `body` section are correct",
            "only `head`",
            "only `body`"
        ],
        answer: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called `xxx.js?`",
        options: [
            "script href = `xxx.js`",
            "script name = `xxx.js`",
            "script src = `xxx.js`"
        ],
        answer: 2
    }
];

//const
const progressBar = document.querySelector(".progress-bar");
const questionArea = document.querySelector(".questionArea");
const scoreArea = document.querySelector(".scoreArea");
const scoreHeader = document.querySelector(".scoreHeader");
const scorePct = document.querySelector(".scorePct");

//initial data
let currentQuestion = 0;
let correctAnswers = 0;
let numberOfQuestion = 1;

showQuestion();

//reset event
document.querySelector(".scoreArea button").addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;
    numberOfQuestion = 1;
    showQuestion();
});

//show question
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let progress = Math.floor((currentQuestion / questions.length) * 100);
        progressBar.style.width = `${progress}%`;

        scoreArea.style.display = "none";
        questionArea.style.display = "block";

        document.querySelector(".question").innerHTML = numberOfQuestion + ". " + q.question;

        let optionsHtml = "";

        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"> ${q.options[i]}</div>`;
        }

        document.querySelector(".options").innerHTML = optionsHtml;

        document.querySelectorAll(".options .option").forEach((item) => {
            item.addEventListener("click", optionsClickEvent);
        });
    } 

    else {
        finishQuiz();
    }
}

//click event
function optionsClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute("data-op"));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }
    currentQuestion++;
    numberOfQuestion++;
    showQuestion();
}


//finish quiz
function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 50) {
        scoreHeader.innerHTML = "Not passed!";
        scorePct.style.color = "#f00000";
    }
    else if (points > 50) {
        scoreHeader.innerHTML = "Passed!";
        scorePct.style.color = "#ffc900";
    } 
    
    scorePct.innerHTML = `${points}% Correct`;
    document.querySelector(
        ".scoreText"
    ).innerHTML = `${correctAnswers} of ${questions.length}  is correct!`;

    scoreArea.style.display = "block";
    questionArea.style.display = "none";
    progressBar.style.width = "100%";
}