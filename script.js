const quizData = [
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const timeElement = document.getElementById('time');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    resetTimer();
    showQuestion();
}

function showQuestion() {
    resetTimer();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });

    startTimer();
}

function selectOption(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    clearInterval(timer);
    
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    let timeLeft = timeLimit;
    timeElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectOption({ target: { textContent: null } }); // No selection
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeElement.textContent = timeLimit;
}

function showResult() {
    questionElement.textContent = `You scored ${score} out of ${quizData.length}!`;
    optionsElement.innerHTML = '';
    nextButton.classList.add('hidden');
    resultElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

restartButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', startQuiz);
startQuiz();
