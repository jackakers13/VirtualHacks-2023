// Define array of feather image URLs
var featherImages = [
  "image-1.png",
  "image-2.jpeg",
  "image-3.jpeg",
  "image-4.png",
  "image-5.jpeg",
  "image-6.jpeg",
  "image-7.jpeg",
  "image-8.jpeg"
];

// Duplicate all images to allow matching
featherImages = featherImages.concat(featherImages);

// Shuffle feather image array
featherImages.sort(() => Math.random() - 0.5);

// Define variables for game state
var flippedCards = [];
var matchedCards = [];
var score = 0;
var cardsAreCurrentlyClickable = true;

// Define a function to update the score display
function updateScore(change=0) {
  score += change
  const scoreDisplay = document.querySelector("#score");
  scoreDisplay.textContent = `Score: ${score}`;
}

// Define function to handle card click
function cardClicked(event) {
  const card = event.target;
  const cardIndex = card.dataset.index;

  // Do nothing if the card clicking is currently disabled
  if (!cardsAreCurrentlyClickable) {
    return;
  }
  
  // Do nothing if the card is already matched or flipped
  if (matchedCards.includes(cardIndex) || flippedCards.includes(cardIndex)) {
    return;
  }
  
  // Flip the card and add it to the flippedCards array
  card.src = featherImages[cardIndex];
  flippedCards.push(cardIndex);
  
  // If two cards are flipped, check if they match
  if (flippedCards.length === 2) {
    const [card1Index, card2Index] = flippedCards;
    if (featherImages[card1Index] === featherImages[card2Index]) {
      // If the cards match, add them to the matchedCards array
      matchedCards.push(card1Index, card2Index);
      flippedCards = [];
      updateScore(1);
      // Check if all cards have been matched
      if (matchedCards.length === featherImages.length) {
        setTimeout(() => alert("Congratulations! You've matched all the birds!"));
      }
    } else {
      // If the cards don't match, decrement score and flip them back over after 1 second delay. Also lock inputs during delay.
      updateScore(-1);
      cardsAreCurrentlyClickable = false;
      setTimeout(() => {
        const [card1, card2] = document.querySelectorAll(`[data-index="${card1Index}"], [data-index="${card2Index}"]`);
        card1.src = "card-back.png";
        card2.src = "card-back.png";
        flippedCards = [];
        cardsAreCurrentlyClickable = true;
      }, 1000);
    }
  }
}

// Initialize the unflipped cards
const cardContainer = document.querySelector("#card-container");
cardContainer.innerHTML = "";
featherImages.forEach((cardImagePath, index) => {
  print("Adding Image " + index);
  let card = document.createElement("img");
  card.classList.add("card");
  card.src = "card-back.png";
  card.dataset.index = index;
  // Add a click listener for game logic
  card.addEventListener("click", cardClicked);
  cardContainer.appendChild(card);
});

// Initialize the score display
updateScore()