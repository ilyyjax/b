const grid = document.getElementById('grid');
const scoreBoard = document.getElementById('score-board');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let time = 30;
let currentMonster = null;
let timerId = null;
let monsterTimer = null;

// Create 9 holes
for (let i = 0; i < 9; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  hole.dataset.id = i;
  grid.appendChild(hole);
}

// Randomly show monster
function showMonster() {
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.classList.remove('active', 'monster'));
  
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add('active');
  
  const monster = document.createElement('div');
  monster.classList.add('monster');
  randomHole.appendChild(monster);
  
  currentMonster = randomHole;
}

// Hit monster
grid.addEventListener('click', e => {
  if (e.target.classList.contains('monster')) {
    score++;
    scoreBoard.textContent = `Score: ${score}`;
    currentMonster.classList.remove('active');
    currentMonster.innerHTML = '';
    currentMonster = null;
  }
});

// Countdown timer
function countdown() {
  time--;
  timerEl.textContent = `Time: ${time}s`;
  if (time <= 0) {
    clearInterval(timerId);
    clearInterval(monsterTimer);
    endGame();
  }
}

// Start Game
startBtn.addEventListener('click', () => {
  score = 0;
  time = 30;
  scoreBoard.textContent = `Score: ${score}`;
  timerEl.textContent = `Time: ${time}s`;
  startBtn.style.display = 'none';
  gameOverEl.classList.add('hidden');
  
  showMonster();
  monsterTimer = setInterval(showMonster, 1000);
  timerId = setInterval(countdown, 1000);
});

// End Game
function endGame() {
  finalScoreEl.textContent = score;
  gameOverEl.classList.remove('hidden');
}

// Restart Game
restartBtn.addEventListener('click', () => {
  startBtn.style.display = 'inline-block';
  gameOverEl.classList.add('hidden');
  grid.querySelectorAll('.hole').forEach(hole => {
    hole.classList.remove('active');
    hole.innerHTML = '';
  });
});
