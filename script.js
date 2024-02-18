// Define the array of questions, answers, and the index of the correct answer
let currentQuestionIndex = 0;
const questions = [
    { question: "What color is the sky?", answers: ["Green", "Blue", "Red", "Yellow"], correctIndex: 1 },
    { question: "What animal lives under water?", answers: ["Bear", "Duck", "Shark", "Lizard"], correctIndex: 2 },
    { question: "What animal lives in the snow?", answers: ["Lion", "Wolf", "Polar Bear", "Elephant"], correctIndex: 2 }
];

// Function to display the current question and its answers
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Clear previous answers
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'answer';
        button.onclick = () => checkAnswer(index === question.correctIndex);
        answersContainer.appendChild(button);
    });
    document.getElementById('nextQuestion').style.display = currentQuestionIndex < questions.length - 1 ? 'block' : 'none';
    document.getElementById('backQuestion').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}

// Function to check if the selected answer is correct and provide feedback
function checkAnswer(isCorrect) {
    // Stop and reset any currently playing audio
    stopAudioPlayback();

    // Display the appropriate feedback image
    const correctFeedback = document.getElementById('celebrationImage');
    const incorrectFeedback = document.getElementById('incorrectImage');
    correctFeedback.style.display = 'none';
    incorrectFeedback.style.display = 'none';

    if (isCorrect) {
        document.getElementById('correctSound').play();
        correctFeedback.style.display = 'block';
    } else {
        document.getElementById('incorrectSound').play();
        incorrectFeedback.style.display = 'block';
    }
}

// Function to navigate to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        stopAudioPlayback();
    }
}

// Function to navigate to the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        stopAudioPlayback();
    }
}

// Function to stop any audio playback and reset the audio elements
function stopAudioPlayback() {
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');
    correctSound.pause();
    correctSound.currentTime = 0;
    incorrectSound.pause();
    incorrectSound.currentTime = 0;
    
    // Also hide feedback images
    document.getElementById('celebrationImage').style.display = 'none';
    document.getElementById('incorrectImage').style.display = 'none';
}

// Initialize the quiz by displaying the first question
window.onload = displayQuestion;
