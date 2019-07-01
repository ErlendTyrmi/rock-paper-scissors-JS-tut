let userScore = 0;
let computerScore = 0;
let winLimit = 0.33;
let sliderValue = 50;

const sliderOutput = document.getElementById("slider-level");
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const slider = document.getElementById("myRange");

// Update the current slider value
slider.oninput = function() {
  const difficulty = getSliderValue(this.value);
  sliderOutput.innerHTML = difficulty;
}

function getSliderValue(value){
    if (value > 80){
      winLimit = 0.63;
      return "INSANE";
    } else if (value > 60){
      winLimit = 0.48;
      return "Professional";
    } else if (value > 40){
      winLimit = 0.33;
      return "Balanced";
    } else if (value > 20){
      winLimit = 0.17;
      return "Easy Peasy";
    } else {
      winLimit = 0.1;
      return "Sure thing";
    }
}

function getStronger(userChoice){
  if (userChoice == "rock"){
    return "paper";
  } else if (userChoice == "paper"){
    return "scissors";
  } else {
    return "rock";
  }
}

function getWeaker(userChoice){
  if (userChoice == "rock"){
    return "scissors";
  } else if (userChoice == "paper"){
    return "rock";
  } else {
    return "paper";
  }
}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function win(userChoice, computerChoice){
  const userChoice_div = document.getElementById(userChoice);
  const computerChoice_div = document.getElementById(computerChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML = capitalize(userChoice) + " beats " + computerChoice + ". You won!";
  userChoice_div.classList.add('green-glow');
  setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);
  computerChoice_div.classList.add('gray-glow');
  setTimeout(() => computerChoice_div.classList.remove('gray-glow'), 500);
}

function lose(userChoice, computerChoice){
  const userChoice_div = document.getElementById(userChoice);
  const computerChoice_div = document.getElementById(computerChoice);
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = capitalize(userChoice) + " is beaten by " + computerChoice + ". Computer wins.";
  userChoice_div.classList.add('red-glow');
  setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
  computerChoice_div.classList.add('gray-glow');
  setTimeout(() => computerChoice_div.classList.remove('gray-glow'), 500);
}

function tie(userChoice){
  const userChoice_div = document.getElementById(userChoice);
  result_p.innerHTML = "Both chose " + userChoice + ". It's a tie.";
  userChoice_div.classList.add('gray-glow');
  setTimeout(() => userChoice_div.classList.remove('gray-glow'), 500);
}


function game(userChoice) {
  const randomNumber = Math.random();
  if (randomNumber > 0.66){
    tie(userChoice);
  } else if (randomNumber > winLimit) {
    computerChoice = getWeaker(userChoice);
    win(userChoice, computerChoice);
  } else {
    computerChoice = getStronger(userChoice);
    lose(userChoice, computerChoice);
  }
}

function main(){
  rock_div.addEventListener('click', () => game("rock"));
  paper_div.addEventListener('click', () => game("paper"));
  scissors_div.addEventListener('click', () => game("scissors"));
}

main();
