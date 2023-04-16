// Define array of feather image URLs
const featherImages = [
  "image-1.png",
  "image-2.jpeg",
  "image-3.jpeg",
  "image-4.jpeg",
  "image-5.jpeg",
  "image-6.jpeg",
  "image-7.jpeg",
  "image-8.jpeg"
];

// Shuffle feather image array
featherImages.sort(() => Math.random() - 0.5);

// Define variables for game state
let flippedCards = [];
let matchedCards = [];
let score = 0;

// Define function to handle card click
function cardClicked(event) {
  const card = event.target;
  const cardIndex = card.dataset.index;
  
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
      score += 1;
      // Check if all cards have been matched
      if (matchedCards.length === featherImages.length) {
        alert("Congratulations! You've matched all the feathers!");
      }
    } else {
      // If the cards don't match, flip them back over
      setTimeout(() => {
        const [card1, card2] = document.querySelectorAll(`[data-index="${card1Index}"], [data-index="${card2Index}"]`);
        card1.src = "card-back.jpg";
        card2.src = "card-back.jpg";
        flippedCards = [];
        score -= 1;
      }, 1000);
    }
  }
  
  // Update the score display
  const scoreDisplay = document.querySelector("#score");
  scoreDisplay.textContent = `Score: ${score}`;
}

// Attach click event listener to each card
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.dataset.index = index;
  card.addEventListener("click", cardClicked);
});
