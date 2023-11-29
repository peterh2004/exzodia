// Selecting elements from the DOM
const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

// Variables to manage game state and timing
let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

// Function to initialize the game state
const init = () => {
  greenDisplayed = false;
  waitingForStart = false;
  waitingForGreen = false;
  scores = [];
};

// Initialize the game state
init();

// Function to set the clickable area to green color
const setGreenColor = () => {
  clickableArea.style.backgroundColor = "#32cd32";
  message.innerHTML = "Click Now!";
  message.style.color = "#111";
  greenDisplayed = true;
  timeNow = Date.now();
};

// Function to start the game and set up the timer for green color
const startGame = () => {
  clickableArea.style.backgroundColor = "#c1121f";
  message.innerHTML = "Wait for the Green Color.";
  message.style.color = "#fff";

  let randomNumber = Math.floor(Math.random() * 4000 + 3000);
  timer = setTimeout(setGreenColor, randomNumber);

  waitingForStart = false;
  waitingForGreen = true;
};

// Event listener to start the game when the main menu is clicked
mainMenu.addEventListener("click", () => {
  mainMenu.classList.remove("active");
  startGame();
});

// Function to end the game and display the average reaction time
const endGame = () => {
  endScreen.classList.add("active");
  clearTimeout(timer);

  let total = 0;

  // Calculate the total reaction time
  scores.forEach((s) => {
    total += s;
  });

  // Calculate the average reaction time
  let averageScore = Math.round(total / scores.length);

  // Display the average reaction time
  reactionTimeText.innerHTML = `${averageScore} ms`;
};

// Function to display the reaction time and manage game continuation
const displayReactionTime = (rt) => {
  clickableArea.style.backgroundColor = "#faf0ca";
  message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
  greenDisplayed = false;
  waitingForStart = true;
  scores.push(rt);

  // If the player has completed three rounds, end the game
  if (scores.length >= 3) {
    endGame();
  }
};

// Function to display a message if the user clicks too soon
const displayTooSoon = () => {
  clickableArea.style.backgroundColor = "#faf0ca";
  message.innerHTML = "Too Soon. Click to continue";
  message.style.color = "#111";
  waitingForStart = true;
  clearTimeout(timer);
};

// Event listener for clicks on the clickable area
clickableArea.addEventListener("click", () => {
  // If the green color is displayed, calculate and display reaction time
  if (greenDisplayed) {
    let clickTime = Date.now();
    let reactionTime = clickTime - timeNow;
    displayReactionTime(reactionTime);
    return;
  }

  // If waiting for the start, initiate the game
  if (waitingForStart) {
    startGame();
    return;
  }

  // If waiting for the green color and the user clicks, display a message
  if (waitingForGreen) {
    displayTooSoon();
  }
});

// Event listener for the play again button to restart the game
playAgainBtn.addEventListener("click", () => {
  endScreen.classList.remove("active");
  init();
  startGame();
});
