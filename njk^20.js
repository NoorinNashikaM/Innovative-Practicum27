<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quest for the Lost Verbs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            padding: 20px;
        }
        .container {
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        input[type="text"] {
            padding: 10px;
            font-size: 16px;
        }
        #options button {
            margin: 5px;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
        }
        #options button:hover {
            background-color: #ddd;
        }
        #score {
            font-size: 18px;
            font-weight: bold;
        }
        #nextButton {
            display: none;
        }
        #badges {
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- Homepage -->
    <div class="container" id="home">
        <h1>Welcome to Quest for the Lost Verbs!</h1>
        <p>Enter your name to start your adventure:</p>
        <input type="text" id="userName" placeholder="Enter your name" />
        <button onclick="startGame()">Start the Game</button>
    </div>

    <!-- Game Pages -->
    <div class="container" id="game" style="display: none;">
        <h2 id="greeting"></h2>
        <div id="question"></div>
        <div id="options"></div>
        <button id="nextButton" onclick="nextQuestion()">Next Question</button>
        <div id="score"></div>
    </div>

    <!-- End Game -->
    <div class="container" id="endGame" style="display: none;">
        <h2>Congratulations, you finished the game!</h2>
        <p>Your final score: <span id="finalScore"></span></p>
        <div id="badges"></div>
        <button onclick="restartGame()">Play Again</button>
    </div>

    <script>
        let currentQuestionIndex = 0;
        let score = 0;
        let userName = "";

        const questions = [
            {
                question: "What does 'pick up' mean?",
                options: ['Start', 'Lift', 'Continue', 'Collect'],
                correctAnswer: 'Lift'
            },
            {
                question: "What does 'run into' mean?",
                options: ['Crash', 'Meet unexpectedly', 'Run away', 'Run fast'],
                correctAnswer: 'Meet unexpectedly'
            },
            {
                question: "What does 'give up' mean?",
                options: ['Stop trying', 'Give away', 'Put down', 'Start over'],
                correctAnswer: 'Stop trying'
            },
            {
                question: "What does 'bring up' mean?",
                options: ['Start a conversation', 'Raise something', 'Lift up', 'Bother someone'],
                correctAnswer: 'Start a conversation'
            },
            {
                question: "What does 'turn up' mean?",
                options: ['Arrive', 'Appear unexpectedly', 'Fix', 'Adjust volume'],
                correctAnswer: 'Arrive'
            },
            // Add more questions as needed
        ];

        function startGame() {
            userName = document.getElementById('userName').value;
            if (userName) {
                document.getElementById('greeting').innerText = `Welcome, ${userName}! Let's begin your adventure!`;
                document.getElementById('home').style.display = 'none';
                document.getElementById('game').style.display = 'block';
                loadQuestion();
            } else {
                alert('Please enter your name!');
            }
        }

        function loadQuestion() {
            const question = questions[currentQuestionIndex];
            document.getElementById('question').innerText = question.question;
            const shuffledOptions = shuffleArray(question.options);
            let optionsHTML = '';
            shuffledOptions.forEach(option => {
                optionsHTML += `<button onclick="checkAnswer('${option}')">${option}</button>`;
            });
            document.getElementById('options').innerHTML = optionsHTML;
            document.getElementById('nextButton').style.display = 'none';
        }

        function checkAnswer(selectedOption) {
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
            if (selectedOption === correctAnswer) {
                score++;
            }
            showCorrectAnswer(correctAnswer);
        }

        function showCorrectAnswer(correctAnswer) {
            const allButtons = document.querySelectorAll('#options button');
            allButtons.forEach(button => {
                if (button.innerText === correctAnswer) {
                    button.style.backgroundColor = 'green';
                } else {
                    button.style.backgroundColor = 'red';
                }
            });

            document.getElementById('score').innerText = `Your Score: ${score}`;
            document.getElementById('nextButton').style.display = 'inline-block';
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endGame();
            }
        }

        function endGame() {
            document.getElementById('game').style.display = 'none';
            document.getElementById('endGame').style.display = 'block';
            document.getElementById('finalScore').innerText = score;

            const badges = generateBadges(score);
            document.getElementById('badges').innerHTML = badges.join('');
        }

        function generateBadges(score) {
            let badges = [];
            if (score >= 15) {
                badges.push('<p>You earned the Master of Verbs badge!</p>');
            } else if (score >= 10) {
                badges.push('<p>You earned the Verb Expert badge!</p>');
            } else if (score >= 5) {
                badges.push('<p>You earned the Verb Novice badge!</p>');
            } else {
                badges.push('<p>Try again to improve your score!</p>');
            }
            return badges;
        }

        function restartGame() {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById('endGame').style.display = 'none';
            document.getElementById('home').style.display = 'block';
            document.getElementById('userName').value = '';
        }

        // Shuffle array helper function
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    </script>
</body>
</html>
