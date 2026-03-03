// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Set the initial game state
let player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 5
};

let coins = [];
let bombs = [];
let score = 0;

// Draw the player
function drawPlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw coins
function drawCoins() {
  coins.forEach((coin, index) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw bombs
function drawBombs() {
  bombs.forEach((bomb, index) => {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Update game state
function update() {
  // Move player
  if (keysDown['ArrowLeft']) {
    player.x -= player.speed;
  }
  if (keysDown['ArrowRight']) {
    player.x += player.speed;
  }
  if (keysDown['A']) {
    player.x -= player.speed;
  }
  if (keysDown['D']) {
    player.x += player.speed;
  }

  // Spawn coins and bombs
  if (Math.random() < 0.05) {
    coins.push({
      x: Math.random() * canvas.width,
      y: 0,
      speed: Math.random() * 2 + 2
    });
  }
  if (Math.random() < 0.01) {
    bombs.push({
      x: Math.random() * canvas.width,
      y: 0,
      speed: Math.random() * 2 + 2
    });
  }

  // Update coins and bombs
  coins.forEach((coin, index) => {
    coin.y += coin.speed;
    if (coin.y > canvas.height) {
      coins.splice(index, 1);
    }
  });
  bombs.forEach((bomb, index) => {
    bomb.y += bomb.speed;
    if (bomb.y > canvas.height) {
      bombs.splice(index, 1);
    }
  });

  // Check collisions
  coins.forEach((coin, index) => {
    if (player.x + player.width > coin.x && player.x < coin.x + 10 && player.y + player.height > coin.y && player.y < coin.y + 10) {
      score++;
      coins.splice(index, 1);
    }
  });
  bombs.forEach((bomb, index) => {
    if (player.x + player.width > bomb.x && player.x < bomb.x + 10 && player.y + player.height > bomb.y && player.y < bomb.y + 10) {
      alert('Game Over! Your score is ' + score);
      score = 0;
      player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 50,
        height: 50,
        speed: 5
      };
      coins = [];
      bombs = [];
    }
  });

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawCoins();
  drawBombs();
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Score: ' + score, 10, 10);
}

// Handle keyboard input
const keysDown = {};
document.addEventListener('keydown', (event) => {
  keysDown[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  keysDown[event.key] = false;
});

// Main game loop
setInterval(() => {
  update();
}, 16);

// Start the game loop
update();