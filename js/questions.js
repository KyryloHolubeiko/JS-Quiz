const getQuestions = () => {
    return [
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
};

export default getQuestions;
