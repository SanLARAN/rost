const clickBtn = document.getElementById("click-btn");
const clickSound = document.getElementById("click-sound");
const keyboardSound = document.getElementById("keyboard-sound");
const bossSound = document.getElementById("boss-sound");
const clicksDisplay = document.getElementById("clicks");
const timerDisplay = document.getElementById("timer");
const breakDisplay = document.getElementById("break");
const bossAlert = document.getElementById("boss-alert");
const adhdFill = document.getElementById("adhd-fill");
const upgrades = document.querySelectorAll(".upgrade");

let clicks = 0;
let clickPower = 1;
let timeLeft = 30;
let adhdLevel = 0;
let adhdRate = 1;
let timer;

function updateClicks() {
  clicks += clickPower;
  clicksDisplay.textContent = `Клики: ${clicks}`;
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Смена: ${timeLeft}`;
  adhdLevel += adhdRate;
  if (adhdLevel >= 100) adhdLevel = 100;
  adhdFill.style.width = adhdLevel + "%";

  if (timeLeft <= 0) {
    clearInterval(timer);
    endShift();
  }
}

function endShift() {
  if (clicks < 50) {
    bossAlert.classList.remove("hidden");
    bossSound.play();
    setTimeout(() => bossAlert.classList.add("hidden"), 2000);
  } else {
    breakDisplay.classList.remove("hidden");
    setTimeout(() => breakDisplay.classList.add("hidden"), 3000);
  }
  resetGame();
}

function resetGame() {
  clicks = 0;
  timeLeft = 30;
  adhdLevel = 0;
  clicksDisplay.textContent = `Клики: ${clicks}`;
  timerDisplay.textContent = `Смена: ${timeLeft}`;
  adhdFill.style.width = "0%";
  setTimeout(() => {
    timer = setInterval(updateTimer, 1000);
  }, 3000);
}

clickBtn.addEventListener("click", () => {
  updateClicks();
  clickSound.play();
  keyboardSound.play();
});

upgrades.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.upgrade;
    if (type === "1") clickPower++;
    if (type === "2") timeLeft += 5;
    if (type === "3") adhdRate = Math.max(0.5, adhdRate - 0.5);
  });
});

resetGame();
