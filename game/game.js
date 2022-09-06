const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    question: "What is the scientific name of a butterfly?",
    choice1: "Apis",
    choice2: "Coleoptera",
    choice3: "Formicidae",
    choice4: "Rhopalocera", 
    answer: 3
    },
    {
    question: "How hot is the surface of the sun?",
    choice1: "1,233 K",
    choice2: "5,778 K",
    choice3: "12,130 K",
    choice4: "101,300 K",
    answer : 1
    },
    {
    question: "Who are the actors in The Internship?",
    choice1: "Ben Stiller, Jonah Hill",
    choice2: "Courteney Cox, Matt LeBlanc",
    choice3: "Kaley Cuoco, Jim Parsons",
    choice4: "Vince Vaughn, Owen Wilson",
    answer: 3
    },
    {
    question: "What is the capital of Spain?",
    choice1: "Berlin",
    choice2: "Buenos Aires",
    choice3: "Madrid",
    choice4: "San Juan",
   answer: 2
    },
    {
    question: "What are the school colors of the University of Texas at Austin?",
    choice1: "Black, Red",
    choice2: "Blue, Orange",
    choice3: "White, Burnt Orange",
    choice4: "White, Old gold, Gold",
    answer: 2
    },
    {
    question: "What is 70 degrees Fahrenheit in Celsius?",
    choice1: "18.8889",
    choice2: "20",
    choice3: "21.1111",
    choice4: "158",
    answer: 2
    },
    {
    question: "When was Mahatma Gandhi born?",
    choice1: "October 2, 1869",
    choice2: "December 15, 1872",
    choice3: "July 18, 1918",
    choice4: "January 15, 1929",
    answer: 0
    },
    {
    question: "How far is the moon from Earth?",
    choice1: "7,918 miles (12,742 km)",
    choice2: "86,881 miles (139,822 km)",
    choice3: "238,400 miles (384,400 km)",
    choice4: "35,980,000 miles (57,910,000 km)",
    answer: 2
    },
    {
    question: "What is 65 times 52?",
    choice1: "117",
    choice2: "3120",
    choice3: "3380",
    choice4: "3520",
    answer: 2
    },
    {
    question: "How tall is Mount Everest?",
    choice1: "6,683 ft (2,037 m)",
    choice2: "7,918 ft (2,413 m)",
    choice3: "19,341 ft (5,895 m)",
    choice4: "29,029 ft (8,847 m)",
    answer: 3
    },
    {
    question: "When did The Avengers come out?",
    choice1: "May 2, 2008",
    choice2: "May 4, 2012",
    choice3: "May 3, 2013",
    choice4: "April 4, 2014",
    answer: 1
    },
    {
    question: "What is 48,879 in hexidecimal?",
    choice1: "0x18C1",
    choice2: "0xBEEF",
    choice3: "0xDEAD",
    choice4: "0x12D591",
    answer: 1
    }
    ]
    
    const SCORE_POINTS = 100;
    const MAX_QUESTIONS = 12;

    startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
    }

    getNewQuestion = () => {
        if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);

            return window.location.assign('../end/end.html');
        }

        questionCounter++;
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionsIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        })

        availableQuestions.splice(questionsIndex, 1);

        acceptingAnswers = true;
    }

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if(classToApply === 'correct') {
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000)
        })
    })

    incrementScore = num => {
        score +=num;
        scoreText.innerText = score;
    }

    startGame()