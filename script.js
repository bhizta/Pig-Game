'use strict';
//! shortcuts
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const readyBtn = document.querySelector('.btn--ready');
//! initialize variables
let totalRolled, score, currentPlayer, isFirstRoll, isReady, isGameFinished;
//! reset acts as init
reset();
//! functions
function btnToggle() {
  rollBtn.classList.toggle('hidden');
  holdBtn.classList.toggle('hidden');
  readyBtn.classList.toggle('hidden');
}
function winCheck() {
  showScore();
  clearCurrent();
  diceEl.classList.add('hidden');
  if (score[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    isGameFinished = true;
    newBtn.classList.remove('hidden');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
  }
}
function switchPlayer() {
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  isFirstRoll = true;
  totalRolled = 0;
  isReady = false;
  btnToggle();
  clearCurrent();
}
function clearCurrent() {
  current1El.textContent = 0;
  current2El.textContent = 0;
}
function showScore() {
  score1El.textContent = score[0];
  score2El.textContent = score[1];
}
//! button event functions
function roll() {
  if (isReady) {
    let rolled = Math.trunc(Math.random() * 6) + 1;
    if (isFirstRoll && rolled === 1) {
      rolled++;
      isFirstRoll = false;
    }
    if (rolled === 1) {
      switchPlayer();
    } else {
      totalRolled += rolled;
      currentPlayer === 0
        ? (current1El.textContent = totalRolled)
        : (current2El.textContent = totalRolled);
    }
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rolled}.png`;
  }
}
function hold() {
  if (totalRolled) {
    score[currentPlayer] += totalRolled;
    winCheck();
    if (!isGameFinished) {
      switchPlayer();
    }
  }
}
function reset() {
  totalRolled = 0;
  score = [0, 0];
  currentPlayer = 0;
  clearCurrent();
  showScore();
  isReady = true;
  isFirstRoll = true;
  isGameFinished = false;
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  newBtn.classList.add('hidden');
  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
}
function ready() {
  isReady = true;
  btnToggle();
}
//! event listeners
rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newBtn.addEventListener('click', reset);
readyBtn.addEventListener('click', ready);
