var startButton = document.getElementById("start-quiz");
var timeLeft = document.getElementById("time");
var score = document.getElementById("score");
var highScoresList = document.getElementById("high-scores-list");
var questionIndex = 0;
var timer;
var highScores = [];

function startQuiz() {
  startButton.disabled = true;
  timeLeft.textContent = 60;
  score.textContent = 0;
  questionIndex = 0;
  timer = setInterval(function () {
    var time = parseInt(timeLeft.textContent);
    time--;
    timeLeft.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
  nextQuestion();
}

var questions = [
    {
      question: "How do you comment out a single line in JavaScript?",
      answers: ["//", "/*", "#", "--"],
      correctAnswer: "//",
    },
    {
      question: "How do you declare a variable in JavaScript?",
      answers: ["var", "let", "const", "variable"],
      correctAnswer: "var",
    },
    {
      question: "What does 'DOM' stand for?",
      answers: ["Document Object Model", "Data Object Model", "Document Oriented Module", "Document Order Model"],
      correctAnswer: "Document Object Model",
    },
  ];
  

function nextQuestion() {
  var question = questions[questionIndex];
  if (question) {
    var questionElement = document.querySelector(".question");
    questionElement.innerHTML = "<h2>Question " + (questionIndex + 1) + ":</h2><p>" + question.question + "</p>";
    var answersElement = document.querySelector(".answers");
    answersElement.innerHTML = "";
    for (var i = 0; i < question.answers.length; i++) {
      var answerBtn = document.createElement("button");
      answerBtn.classList.add("answer-btn");
      answerBtn.textContent = question.answers[i];
      answerBtn.addEventListener("click", checkAnswer);
      answersElement.appendChild(answerBtn);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var question = questions[questionIndex];
  if (selectedAnswer === question.correctAnswer) {
    var currentScore = parseInt(score.textContent);
    currentScore++;
    score.textContent = currentScore;
  }
  questionIndex++;
  nextQuestion();
}

function endQuiz() {
  clearInterval(timer);
  timeLeft.textContent = "Time's up!";
  startButton.disabled = false;
  var initials = prompt("Enter your initials to save your score:");
  if (initials) {
    var scoreEntry = {
      initials: initials,
      score: parseInt(score.textContent),
    };
    highScores.push(scoreEntry);
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });
    displayHighScores();
  }
}

function displayHighScores() {
  highScoresList.innerHTML = "";
  highScores.forEach(function (entry, index) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(scoreItem);
  });
}

startButton.addEventListener("click", startQuiz);