let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return "rock";
  else if (randomNumber < 2 / 3) return "paper";
  else return "scissors";
}

function getImage(move) {
  return `${move}.png`; // PNG files from your folder
}

function playGame(userMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (userMove === computerMove) {
    result = "Tie.";
    score.ties++;
    updateUI(result, "tie", userMove, computerMove, "tie");
  } else if (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win!";
    score.wins++;
    updateUI(result, "win", userMove, computerMove, "user");
  } else {
    result = "You lose.";
    score.losses++;
    updateUI(result, "lose", userMove, computerMove, "computer");
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();
}

function updateUI(result, resultClass, userMove, computerMove, winner) {
  const resultEl = document.querySelector(".js-result");
  resultEl.textContent = result;
  resultEl.className = "result";
  resultEl.classList.add(resultClass);

  // Winner/Loser scaling
  let userClass = "";
  let computerClass = "";
  if (winner === "user") {
    userClass = "winner";
    computerClass = "loser";
  } else if (winner === "computer") {
    userClass = "loser";
    computerClass = "winner";
  } else {
    userClass = "tie-move";
    computerClass = "tie-move";
  }

  document.querySelector(".js-moves").innerHTML = `
    <div class="battle">
      <div class="move-side ${userClass}">
        <p>You</p>
        <img src="${getImage(userMove)}" alt="${userMove}">
      </div>
      <span class="vs">VS</span>
      <div class="move-side ${computerClass}">
        <p>Computer</p>
        <img src="${getImage(computerMove)}" alt="${computerMove}">
      </div>
    </div>
  `;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem("score");
  updateScore();
  document.querySelector(".js-result").textContent = "";
  document.querySelector(".js-moves").textContent = "";
}

// Initialize on load
updateScore();
