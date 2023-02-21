const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId;
let currentColor;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  intervalId = setInterval(() => {
    currentColor = getRandomHexColor();
    body.style.backgroundColor = currentColor;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;

  clearInterval(intervalId);

  if (currentColor) {
    body.style.backgroundColor = currentColor;
  } else {
    body.style.backgroundColor = '';
  }
});