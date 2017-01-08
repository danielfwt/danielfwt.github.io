/* global $ */
// constructor function to make questions
function Question (prompt, choices, correctAnswerIndex) {
  this.prompt = prompt
  this.choices = choices
  this.correctAnswerIndex = correctAnswerIndex
}

// use constructor function to create questions

var question1 = new Question('Guess the Flag', ['Turkmenistan', 'Jan Mayen', 'Sudan', 'Poland'], 1)
var question2 = new Question('Guess the Flag', ['Croatia', 'Iceland', 'Guinea', 'Solomon Islands'], 2)
var question3 = new Question('Guess the Flag', ['Jamaica', 'Zambia', 'Eritrea', 'Uruguay'], 0)
var question4 = new Question('Guess the Flag', ['Fiji', 'Cuba', 'Mauritania', 'Albania'], 2)
var question5 = new Question('Guess the Flag', ['Lebanon', 'Bangladesh', 'Croatia', 'Haiti'], 2)
var question6 = new Question('Guess the Flag', ['Sierra Leone', 'Cayman Islands', 'United Arab Emirates', 'Kazakhstan'], 0)
var question7 = new Question('Guess the Flag', [' Malta', 'Hungary', 'Bhutan', 'Lebanon'], 1)
var question8 = new Question('Guess the Flag', ['Bulgaria', 'Ghana', 'British Virgin Islands', 'Congo'], 1)
var question9 = new Question('Guess the Flag', ['Switzerland', 'Colombia', 'Ireland', 'Saint Pierre and Miquelon'], 1)
var question10 = new Question('Guess the Flag', ['Austria', 'Latvia', 'Mali', 'Turkmenistan'], 1)

// object quiz to store all questions and settings
var quiz = {
  questions: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10],
  isGameOver: false,
  currentQuestion: 0,
  player1Score: 0,
  player2Score: 0
}

// this funciton return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length
}

// this function return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion
}

// this function return an integer that is the zero-based index of the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctAnswerIndex
}

// this function return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length
}

// this function take a single integer, which specifies which choice the current player wants to make, and return a boolean true/false if the answer is correct
function playTurn (choice) {
  if (quiz.isGameOver) {
    return false
  }

  var isCorrect = false
  if (choice === quiz.questions[quiz.currentQuestion].correctAnswerIndex) {
    isCorrect = true
    showCorrect('correct')
    if (quiz.currentQuestion % 2 === 0) {
      quiz.player1Score++
    } else {
      quiz.player2Score++
    }
  } else {
    showCorrect('wrong')
  }
  quiz.currentQuestion++
  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return isCorrect
}

// this function return a true or false if the quiz is over
function isGameOver () {
  return quiz.isGameOver
}

// this funciton return 0 if the game is not yet finished, return 1 or 2 if player 1 or 2 wins, return 3 if the game is a draw
function whoWon () {
  if (!quiz.isGameOver) {
    return 0
  }
  if (quiz.player1Score > quiz.player2Score) {
    return 1
  } else if (quiz.player1Score < quiz.player2Score) {
    return 2
  } else return 3
}

// this function restart the game
function restart () {
  quiz.isGameOver = false
  quiz.currentQuestion = 0
  quiz.player1Score = 0
  quiz.player2Score = 0
}

// this function update the display
function updateDisplay () {
  if (isGameOver()) {
    if (whoWon() === 1) {
      $('#gameStatus').text('Gameover. The winner is Player1!')
    } else if (whoWon() === 2) {
      $('#gameStatus').text('Gameover. The winner is Player2!')
    } else {
      $('#gameStatus').text('Gameover. It\'s a draw!')
    }
  }

  if (!isGameOver()) {
    $('#gameStatus').text('Q' + (quiz.currentQuestion + 1) + ') ' + 'It\'s Player' + (quiz.currentQuestion % 2 + 1) + '\'s turn')
    // update question
    var flagIndex = quiz.currentQuestion + 1
    $('#flag').css('background-image', 'url(./img/flag' + flagIndex + '.gif)')
    $('#choice1').text(quiz.questions[quiz.currentQuestion].choices[0])
    $('#choice2').text(quiz.questions[quiz.currentQuestion].choices[1])
    $('#choice3').text(quiz.questions[quiz.currentQuestion].choices[2])
    $('#choice4').text(quiz.questions[quiz.currentQuestion].choices[3])
    // update sccore
    $('#player1Score').text(quiz.player1Score)
    $('#player2Score').text(quiz.player2Score)
  }
}

$(function () {
  updateDisplay()
  $('#restart').click(function () {
    restart()
    updateDisplay()
  })
  $('#choice1').click(function () {
    playTurn(0)
    updateDisplay()
  })
  $('#choice2').click(function () {
    playTurn(1)
    updateDisplay()
  })
  $('#choice3').click(function () {
    playTurn(2)
    updateDisplay()
  })
  $('#choice4').click(function () {
    playTurn(3)
    updateDisplay()
  })
})

// this function show animation of tick/cross mark depending on whether the player's choice is correct or wrong
function showCorrect (type) {
  if (quiz.currentQuestion % 2 === 0) {
    $('.check').removeAttr('style')
    .attr('id', type)
    .css({
      top: 100,
      left: 20
    }).fadeIn()
  } else {
    $('.check').removeAttr('style')
    .attr('id', type)
    .css({
      top: 100,
      right: 20
    }).fadeIn()
  }

  var timeOut = setTimeout(function () {
    $('.check').hide()
  }, 1000)
}
