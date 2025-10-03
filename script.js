"use strict";

// Array for computer choices.
const computerChoice = [ 
    {name: "rock", src: "images/rock.PNG"},
    {name: "paper", src: "images/paper.PNG"},
    {name: "scissors", src: "images/scissors.PNG"},
    {name: "question", src: "images/question-mark.PNG"}
];

let playerChoice = document.querySelectorAll(".player");
let playAgain = document.querySelector("#replay");
let resetScore = document.querySelector("#reset");

for(let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener('click', cycle);
}

/**
 * Event listener to play again. 
 * Function resets the player and computer images.
 */
playAgain.addEventListener('click', function() {
    let playerThrow = document.querySelector(".selected");
    playerThrow.classList.remove("selected");
    
    let computerThrow = document.querySelector("#computer");
    computerThrow.src = computerChoice[3].src;
});

/**
 * Event listener to reset the scoreboard.
 * Function resets the scoreboard values to 0.
 */
resetScore.addEventListener('click', function() {
    updateScoreboard(2);
});

/**
 * Function cycles through the computer choices.
 * It then stops the cycle, randomly selects a choice for the computer, and determines the winner.
 * @param {click} event the event so the function knows which image was clicked. 
 */
function cycle(event) {
    let playerThrow = event.currentTarget;
    playerThrow.classList.add("selected");



    let computerThrow = document.querySelector("#computer");
    let cycleTimer = setInterval(cycleImages, 500);
    let computerTimer = setTimeout(stopCycle, 3000);

    let index = 0;
    /**
     * Function to cycle through the computer choices in half second intervals.
     */
    function cycleImages() {
            if (index < computerChoice.length - 2) {
                computerThrow.src = computerChoice[index].src;
                index++;
            } else {
                computerThrow.src = computerChoice[index].src;
                index = 0;
            }
    }

    /**
     * Function to stop cycling computer choices after 3 seconds.
     * It then randomly selects a choice for the computer and determines the winner.
     */
    function stopCycle() {
        clearInterval(cycleTimer);
        clearTimeout(computerTimer);
        let randomIndex = Math.floor(Math.random() * 3);
        computerThrow.src = computerChoice[randomIndex].src;
        determineWinner(playerThrow, computerChoice[randomIndex].name);
    }
}

/**
 * This function determines the winnder of the round.
 * @param {string} player The choice the player made.
 * @param {string} computer The choice the computer made.
 */
function determineWinner(player, computer) {
    let result = document.querySelector("#result");
    let playerSelection = player.getAttribute("data-name");

    if (playerSelection === computer) {
        result.textContent = "It's a tie!";
        updateScoreboard(0);
    }
    else if (playerSelection === "rock") {
        if (computer === "scissors") {
            result.textContent = "You win!";
            updateScoreboard(1);
        }
        else if (computer === "paper") {
            result.textContent = "You lose!";
            updateScoreboard(-1);
        }
    }
    else if (playerSelection === "paper") {
        if (computer === "scissors") {
            result.textContent = "You lose!";
            updateScoreboard(-1);
        }
        else if (computer === "rock") {
            result.textContent = "You win!";
            updateScoreboard(1);
        }
    }
    else if (playerSelection === "scissors") {
        if (computer === "rock") {
            result.textContent = "You lose!";
            updateScoreboard(-1);
        }
        else if (computer === "paper") {
            result.textContent = "You win!";
            updateScoreboard(1);
        }
    }
}

/**
 * This function updates the scoreboard based on result.
 * @param {number} result An integer representing the result of the round -1 for lose, 0 for tie, 1 for win, and 2 for reset.
 */
function updateScoreboard(result) {
    let wins = document.querySelector("#wins");
    let loses = document.querySelector("#loses");
    let ties = document.querySelector("#ties");

    if (result === -1) {
        loses.textContent = parseInt(loses.textContent) + 1;
    }
    else if (result === 0) {
        ties.textContent = parseInt(ties.textContent) + 1;
    }
    else if (result === 1) {
        wins.textContent = parseInt(wins.textContent) + 1;
    }
    else if (result === 2) {
        wins.textContent = "0";
        loses.textContent = "0";
        ties.textContent = "0";
    }
}
