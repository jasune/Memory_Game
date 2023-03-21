const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreDisplay = document.getElementById("score-display");

let score = 0;
let canFlip = true;
let flippedCards = [];
let matchedCards = [];
let colors = [];

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "pink",
    "brown",
    "black",
    "lime",
    "teal",
    "maroon",
    "navy",
    "olive",
    "salmon",
    "indigo",
    "turquoise",
    "coral"
  ];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card-back");
    newDiv.classList.add("rounded");
    newDiv.setAttribute("data-color", color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (canFlip) {
    let card = event.target;
    if (!card.classList.contains("card-back")) return;
    if (flippedCards.length < 2) {
      card.style.backgroundColor = card.getAttribute("data-color");
      card.classList.remove("card-back");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        canFlip = false;
        let firstCardColor = flippedCards[0].getAttribute("data-color");
        let secondCardColor = flippedCards[1].getAttribute("data-color");
        if (firstCardColor === secondCardColor) {
          matchedCards.push(...flippedCards);
          flippedCards = [];
          canFlip = true;
          score++;
          scoreDisplay.textContent = `Score: ${score}`;
          if (matchedCards.length === colors.length) {
            endGame();
          }
        } else {
          setTimeout(() => {
            flippedCards[0].style.backgroundColor = "";
            flippedCards[1].style.backgroundColor = "";
            flippedCards[0].classList.add("card-back");
            flippedCards[1].classList.add("card-back");
            flippedCards = [];
            canFlip = true;
            scoreDisplay.textContent = `Score: ${score}`;
          }, 1000);
          score++;
          scoreDisplay.textContent = `Score: ${score}`;
        }
      }
    }
  }
}

function startGame() {
  startButton.style.display = "none";
  restartButton.style.display = "block";
  scoreDisplay.style.display = "block";
  colors = shuffle(COLORS.slice(0, Math.floor(COLORS.length / 2)));
  colors = [...colors, ...colors];
  shuffle(colors);
  createDivsForColors(colors);
}

startButton.addEventListener("click", startGame);

function endGame() {
  let lowestScore = localStorage.getItem("lowestScore");
  if (lowestScore === null || score < lowestScore) {
    localStorage.setItem("lowestScore", score);
    alert(`Yippee! You have the new lowest score: ${score}`);
  } else {
    alert(`Congratulations! Your score: ${score}. Lowest score: ${lowestScore}`);
  }
  gameContainer.innerHTML = "";
  startButton.style.display = "block";
  restartButton.style.display = "none";
  scoreDisplay.style.display = "none";
  score = 0;
  flippedCards = [];
  matchedCards = [];
}

function restartGame() {
    gameContainer.innerHTML = "";
    startGame();
    score = 0;
    flippedCards = [];
    matchedCards = [];
    scoreDisplay.textContent = `Score: ${score}`;
  }

  