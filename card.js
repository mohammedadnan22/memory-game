const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
  { name: "bee", image:"data:image/jpeg;base64,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" },
  { name: "crocodile", image:"data:image/png;base64,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" },
  { name: "macaw", image:"data:image/jpeg;base64,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" },
  { name: "gorilla", image: "data:image/jpeg;base64,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" },
  { name: "tiger", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGsG84sxERVzN5tDh5WzdcT5YGPZ8w0ABtHA&usqp=CAU" },
  { name: "monkey", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnsxA2LPfBz4T5AeURR_DlTUHNzaRUu_9_iA&usqp=CAU" },
  { name: "chameleon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn9MpjPYFLC5jZPEYMksULO-4k-9mSbrydMA&usqp=CAU" },
  { name: "piranha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlSU56_9T2xpluKXF605-vN-RxK7QyfKcG_g&usqp=CAU" },
  { name: "anaconda", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYeB2luRtO8q4j3hJUISxPvXNaVgpDAUj8A&usqp=CAU" },
  { name: "sloth", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxuLzBsYKSyR89L6VkFnd2_pCFRiOdTMCCow&usqp=CAU" },
  { name: "cockatoo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoFRV4EeUnmFiIYto-UR2zAv9inJdxxFriw&usqp=CAU" },
  { name: "toucan", image: "data:image/jpeg;base64,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" },
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>congratulations! You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};