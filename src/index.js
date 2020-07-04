import './index.scss';

const rulesButton = document.querySelector('.footer__btn');
const closeRulesButton = document.querySelector('.rules__button');
const menuButton = document.querySelector('.menu__button');
const rules = document.querySelector('.rules');
const play = document.querySelector('.play');
const decision = document.querySelector('.decision');
const menu = document.querySelector('.menu');
const youPick = document.querySelector('.you__pick');
const youImage = document.querySelector('.you__image');
const compImage = document.querySelector('.comp__image');
const menuComp = document.querySelector('.menu__comp');
const paper = document.querySelector('.play__paper, .play__paper *');
const scissors = document.querySelector('.play__scissors, .play__scissors *');
const rock = document.querySelector('.play__rock, .play__rock *');
const score = document.querySelector('.header__score');
let totalScore = 0;
let addedCompClass;
let addedYouClass;

if (localStorage.getItem('score') !== 'undefined') {
  totalScore = localStorage.getItem('score');
  score.textContent = totalScore;
} else {
  score.textContent = totalScore;
}

const wins = () => {
  decision.textContent = 'you win';
  decision.style.display = 'block';
  menuButton.style.display = 'block';
  menuButton.style.color = 'var(--dark-text)';
  totalScore++;
  localStorage.setItem('score', totalScore);
  score.textContent = totalScore;
};
const lose = () => {
  decision.textContent = 'you lose';
  decision.style.display = 'block';
  menuButton.style.display = 'block';
  menuButton.style.color = 'hsl(349, 71%, 52%)';
  totalScore--;
  localStorage.setItem('score', totalScore);
  score.textContent = totalScore;
};

const updateUI = type => {
  menuComp.style.opacity = '0';
  play.style.display = 'none';
  menu.style.display = 'flex';
  youPick.classList.add(`menu__${type}`);
  youImage.src = `./img/icon-${type}.svg`;
  addedYouClass = `menu__${type}`;

  const rand = Math.floor(Math.random() * 3);
  const compPlay = ['paper', 'scissors', 'rock'];
  const picked = compPlay[rand];

  setTimeout(() => {
    menuComp.style.opacity = '1';
    menuComp.classList.add(`menu__${picked}`);
    addedCompClass = `menu__${picked}`;
    compImage.src = `./img/icon-${picked}.svg`;

    setTimeout(() => {
      if (picked === type) {
        decision.textContent = 'draw';
        decision.style.display = 'block';
        menuButton.style.display = 'block';
        menuButton.style.color = 'var(--dark-text)';
      } else if (picked !== type) {
        // winTest(type, compPlay);
        if (type === 'paper') {
          if (picked === 'rock') {
            wins();
          } else if (picked === 'scissors') {
            lose();
          }
        } else if (type === 'scissors') {
          if (picked === 'paper') {
            wins();
          } else if (picked === 'rock') {
            lose();
          }
        } else if (type === 'rock') {
          if (picked === 'scissors') {
            wins();
          } else if (picked === 'paper') {
            lose();
          }
        }
      }
    }, 500);
  }, 1000);
};

paper.addEventListener('click', () => {
  updateUI('paper');
});

scissors.addEventListener('click', () => {
  updateUI('scissors');
});

rock.addEventListener('click', () => {
  updateUI('rock');
});

menuButton.addEventListener('click', () => {
  decision.style.display = 'none';
  menuButton.style.display = 'none';
  menu.style.display = 'none';
  play.style.display = 'inline-grid';
  menuComp.classList.remove(addedCompClass);
  youPick.classList.remove(addedYouClass);
});

rulesButton.addEventListener('click', () => {
  if (window.innerWidth <= 450) {
    rules.style.height = '100vh';
  } else if (window.innerWidth > 450) {
    rules.style.height = '100%';
  }
});

closeRulesButton.addEventListener('click', () => {
  rules.style.height = '0';
});
