/*------Constants------*/

/*------Variables------*/

    // Define variables for secret number, guess list, current guess, if there is a winner (boolean).
    let secretNum, guessList, isWinner, currentGuess;

/*------Cached Element References------*/

    // Define cached element reference for the game message and previous guesses HTML elements, and both buttons.

    const messageEl = document.getElementById('message');
    const guessesEl = document.getElementById('prevGuesses');
    const guessBtn = document.getElementById('guessButton');
    const resetBtn = document.getElementById('resetButton');
    const guessInput = document.getElementById('guessInput');
    const titleEl = document.querySelector('h1');

/*------Event Listeners------*/

    // Write an event listener for the 'Reset' button to run the initialization function and reset the game.

    resetBtn.addEventListener('click', function(){
        init();
    });

    // Add an event listener for the 'Submit' button that calls a function to check the current guess. Pass the current value of the input element into the function for comparison. This function should compare the guess to the secret number. Stub up conditional statements to handle what happens when the number is higher, lower, or equal to the secret number.

    guessBtn.addEventListener('click',function(){
        if(guessList.length === 0){
            guessesEl.innerText = 'Previous Guesses: ';
        }
        if(isWinner === false){
            checkGuess(parseInt(guessInput.value));
        }
    });

/*------Functions------*/

        function checkGuess(guess) {
            guessInput.value ='';
            
            if(guess < 1 || guess > 100){
                messageEl.innerText = 'Inavlid. Please enter a number between 1 and 100.'
            } else if(guess === secretNum){
                //win scenario
                titleEl.className = 'animated bounce';
                messageEl.className = 'winner';
                isWinner = true;
                confetti.start(1500);
                if (guessList.length === 0) {
                    messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`;
                } else {
                    messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`;
                }
            } else if( guess < secretNum){
                //handle guess is too low
                messageEl.className = 'low';
                messageEl.innerText = `${guess} is too low, please try again!`;
                guessList.push(guess);
            } else {
                //handle guess is too high
                messageEl.className = 'high';
                messageEl.innerText = `${guess} is too high, please try again!`;
                guessList.push(guess);
            }
            render(guess);
        };

    // Create an HTML element for the game's title.
    // Create an HTML element to handle displaying messages to the user.
    // Create an input field for the user to enter a number.
    // Create an HTML element to handle displaying a list of previous guesses.
    // Create 'Guess' and 'Reset' buttons.



    // Write an initialization function that resets the game's status and picks a winning number. Call the initialization function before any other functions.

        function init(){
            messageEl.className = '';
            guessesEl.innerText = '';
            messageEl.innerText = 'Please enter a guess between 1 and 100!';
            guessInput.value = '';
            guessList = [];
            isWinner = false;
            secretNum = Math.floor(Math.random() * 100 + 1);

            // currentGuess
        }

    // Write a render function to display the list of previous guesses on the page. Append an element to the cached guesses element, also adding a class name indicating whether it is higher or lower than the secret number.

        function render(guess) {
            //Append a child div to the guesses div base on whether guess in > or < than secretNum
            if (guess > secretNum) {
                let div = document.createElement('div');
                div.innerText = guess;
                div.className = 'high';
                guessesEl.appendChild(div);
            } else if (guess < secretNum){
                let div = document.createElement('div');
                div.innerText = guess;
                div.className = 'low';
                guessesEl.appendChild(div);
            } else {
                let div = document.createElement('div');
                div.innerText = guess;
                div.className = 'winner';
                guessesEl.appendChild(div);
            }
        }

// Fill in each of the conditional statements for the checkGuess function. Flip the isWinner variable to true if there's a correct guess to prevent additional clicks. Add a line to clear out the guess input value as well as error handling for inputting a number out of range. Push the guess into the previous guesses array. Call a function to render all guesses.

init();