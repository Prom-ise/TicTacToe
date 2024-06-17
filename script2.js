// const pleaseElement = document.querySelector('.please');
// const pleaseText = [
//   "Select the mode you want to play",
//   "Select the board size of you choice",
//   "click PLAY to start the Game",
//   "ENJOY THE GAME 😉"
// ];
// let currentSentence = 0;
// let typed = 0;

// const typeWriter = () => {
//   if (typed < pleaseText[currentSentence].length) {
//     pleaseElement.textContent = pleaseText[currentSentence].substring(0, typed + 1);
//     typed++;
//     setTimeout(typeWriter, 20);
//   } else {
//     typed = 0;
//     currentSentence = (currentSentence + 1) % pleaseText.length;
//     setTimeout(typeWriter, 2500);
//   }
// };

// typeWriter();

// function startingGame() {
//     window.location.href = 'game.html';
// }