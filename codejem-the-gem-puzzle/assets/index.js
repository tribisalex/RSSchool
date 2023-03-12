// menu
const nav = document.getElementById('nav');
const winnerPopap = document.querySelector('.winner__popap');
const resultPopap = document.querySelector('.results__popap');
const resultOl = document.querySelector('.result-ol');
const overlay = document.querySelector('.overlay');
const popapText = document.querySelector('.popap-text');
const soundsChoice = document.getElementById('sound');
let isSoundOn = true;
let resultArr;

if (localStorage.results) {
  resultArr = JSON.parse(localStorage.getItem("results"));
  for (let i = 0; i < resultArr.length; i++) {
    let li = document.createElement('li');
    li.textContent = resultArr[i];
    resultOl.append(li);
  }
} else {
  resultArr = [];
}

soundsChoice.addEventListener('input', () => {
  soundsChoice.value === 'On' ? isSoundOn = true : isSoundOn = false;
  localStorage.setItem('sounds', soundsChoice.value);
})

// sound bip
function playBip() {
  var audio = new Audio('assets/sounds/01.mp3');
  audio.play();
}

// sound winner
function playWinner() {
  var audio = new Audio('assets/sounds/02.mp3');
  audio.play();
}

let canvas = document.getElementById("canvas");
canvas.width = 320;
canvas.height = 320;
let int = null;
const navItem = document.querySelectorAll('.nav-item');
const choiceSizeItem = document.querySelectorAll('.choice__size-item');
let activeNav = document.querySelector('.nav-item.active') || navItem[0];
let activeSize = document.querySelector('.choice__size-item.active') || choiceSizeItem[0];
let sizeLabel = document.querySelector('.frame__size-name');
let sizePuzzle = 4;

sizeLabel.textContent = '4 x 4';

for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener('click', toggleActiveNav);
}

function toggleActiveNav() {
  activeNav.classList.remove('active');
  this.classList.add('active');
  activeNav = this;
}

for (let i = 0; i < choiceSizeItem.length; i++) {
  choiceSizeItem[i].addEventListener('click', toggleActiveSize);
}

function toggleActiveSize() {
  activeSize.classList.remove('active');
  this.classList.add('active');
  activeSize = this;
  sizeLabel.textContent = activeSize.textContent;
  sizePuzzle = Number(activeSize.textContent[0]);
  startShuffle();
  clearInterval(int);
  [seconds, minutes] = [0, 0];
  timerRef.textContent = '00 : 00';
  int = setInterval(timer, 1000);
  moves.textContent = 0;
}

document.onclick = e => {
  if (e.target.id === 'overlay' || e.target.id === 'close' || e.target.id === 'close-results') {
    document.body.classList.remove('active');
    overlay.classList.remove('active');
    winnerPopap.classList.remove('active');
    resultPopap.classList.remove('active');
    startShuffle();
  } else if (e.target.id === 'menuburger_item' || e.target.id === 'menuburger') {
    nav.classList.add('active');
  }
    // else if (e.target.id === 'stop' || e.target.id === 'stop_button') {
    //   nav.classList.remove('active');
    //   localStorage.clear();
    //   clearInterval(int);
  // }
  else if (e.target.id === 'shuffle' || e.target.id === 'shuffle_button') {
    // start timer
    clearInterval(int);
    [seconds, minutes] = [0, 0];
    timerRef.textContent = '00 : 00';
    int = setInterval(timer, 1000);
    moves.textContent = '0';
    nav.classList.remove('active');
    // shuffle puzzle
    startShuffle();
  } else if (e.target.id === 'save' || e.target.id === 'save_button') {
    nav.classList.remove('active');
  } else if (e.target.id === 'results' || e.target.id === 'results_button') {
    nav.classList.remove('active');
    document.body.classList.add('active');
    overlay.classList.add('active');
    resultPopap.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
}

// timer
let timerRef = document.querySelector(".time__value");
let moves = document.querySelector(".moves__value");
localStorage.time ? timerRef.textContent = localStorage.time : timerRef.textContent = '00 : 00';
localStorage.moves ? moves.textContent = localStorage.moves : moves.textContent = '0';

let [seconds, minutes] = [0, 0];

function timer() {
  seconds += 1;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  timerRef.textContent = ` ${m} : ${s}`;
}

// canvas game
function getBool() {
  if (Math.floor(Math.random() * 2) === 0) {
    return true;
  }
}

function TagGame(context, cellSize) {
  if (sizePuzzle === 3) {
    this.state = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ];
  } else if (sizePuzzle === 4) {
    this.state = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ];
  } else if (sizePuzzle === 5) {
    this.state = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 0]
    ];
  } else if (sizePuzzle === 6) {
    this.state = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 0]
    ];
  } else if (sizePuzzle === 7) {
    this.state = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, 32, 33, 34, 35],
      [36, 37, 38, 39, 40, 41, 42],
      [43, 44, 45, 46, 47, 48, 0]
    ];
  } else if (sizePuzzle === 8) {
    this.state = [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63, 0]
    ];
  } else if (sizePuzzle === 9) {
    this.state = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, 32, 33, 34, 35, 36],
      [37, 38, 39, 40, 41, 42, 43, 44, 45],
      [46, 47, 48, 49, 59, 51, 52, 53, 54],
      [55, 56, 57, 58, 59, 60, 61, 62, 63],
      [64, 65, 66, 67, 68, 69, 70, 71, 72],
      [73, 74, 75, 76, 77, 78, 79, 80, 0]
    ];
  }

  this.color = "#ffffff";

  this.context = context;
  this.cellSize = cellSize;

  // localStorage.moves ? this.clicks = localStorage.moves :
  this.clicks = 0;
}

TagGame.prototype.getMoves = function () {
  return this.clicks;
};

TagGame.prototype.appearanceCell = function (x, y) {
  this.context.fillStyle = this.color;
  this.context.fillRect(
    x + 1,
    y + 1,
    this.cellSize - 2,
    this.cellSize - 2
  );
};

TagGame.prototype.appearanceNum = function () {
  this.context.font = "bold " + (this.cellSize / 3) + "px Roboto";
  this.context.textAlign = "center";
  this.context.fillStyle = "#a5a5a5";
};

TagGame.prototype.draw = function () {
  for (let i = 0; i < sizePuzzle; i++) {
    for (let j = 0; j < sizePuzzle; j++) {
      if (this.state[i][j] > 0) {
        this.appearanceCell(
          j * this.cellSize,
          i * this.cellSize
        );
        this.appearanceNum();
        this.context.fillText(
          this.state[i][j],
          j * this.cellSize + this.cellSize / 2,
          i * this.cellSize + this.cellSize / 2
        );
      }
    }
  }
};

TagGame.prototype.getNullCell = function () {
  for (let i = 0; i < sizePuzzle; i++) {
    for (let j = 0; j < sizePuzzle; j++) {
      if (this.state[j][i] === 0) {
        return {x: i, y: j};
      }
    }
  }
};

TagGame.prototype.move = function (x, y) {
  let nullCell = this.getNullCell();
  let canMoveVertical = (x - 1 === nullCell.x || x + 1 === nullCell.x) && y === nullCell.y;
  let canMoveHorizontal = (y - 1 === nullCell.y || y + 1 === nullCell.y) && x === nullCell.x;
  if (canMoveVertical || canMoveHorizontal) {
    this.state[nullCell.y][nullCell.x] = this.state[y][x];
    this.state[y][x] = 0;
    this.clicks++;
  }
};

TagGame.prototype.winners = function () {
  let combination;
  if (sizePuzzle === 3) {
    combination = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ]
  } else if (sizePuzzle === 4) {
    combination = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ];
  } else if (sizePuzzle === 5) {
    combination = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 0]
    ];
  } else if (sizePuzzle === 6) {
    combination = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 0]
    ];
  } else if (sizePuzzle === 7) {
    combination = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, 32, 33, 34, 35],
      [36, 37, 38, 39, 40, 41, 42],
      [43, 44, 45, 46, 47, 48, 0]
    ];
  } else if (sizePuzzle === 8) {
    combination = [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63, 0]
    ];
  } else if (sizePuzzle === 9) {
    combination = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, 32, 33, 34, 35, 36],
      [37, 38, 39, 40, 41, 42, 43, 44, 45],
      [46, 47, 48, 49, 59, 51, 52, 53, 54],
      [55, 56, 57, 58, 59, 60, 61, 62, 63],
      [64, 65, 66, 67, 68, 69, 70, 71, 72],
      [73, 74, 75, 76, 77, 78, 79, 80, 0]
    ];
  }

  let res = true;
  for (let i = 0; i < sizePuzzle; i++) {
    for (let j = 0; j < sizePuzzle; j++) {
      if (combination[i][j] !== this.state[i][j]) {
        res = false;
        break;
      }
    }
  }
  return res;
};

TagGame.prototype.mix = function (count) {
  let x, y;
  for (let i = 0; i < count; i++) {
    let nullCell = this.getNullCell();
    let verticalMove = getBool();
    let upLeft = getBool();
    if (verticalMove) {
      x = nullCell.x;
      if (upLeft) {
        y = nullCell.y - 1;
      } else {
        y = nullCell.y + 1;
      }
    } else {
      y = nullCell.y;
      if (upLeft) {
        x = nullCell.x - 1;
      } else {
        x = nullCell.x + 1;
      }
    }
    if (0 <= x && x <= sizePuzzle - 1 && 0 <= y && y <= sizePuzzle - 1) {
      this.move(x, y);
    }
  }
  // localStorage.moves ? this.clicks = localStorage.moves :
  this.clicks = 0;
};

const startShuffle = () => {
  let context = canvas.getContext("2d");
  context.fillStyle = '#aaaaaa';
  context.fillRect(0, 0, canvas.width, canvas.height);
  let cellSize = canvas.width / sizePuzzle;
  let tagGame = new TagGame(context, cellSize);
  tagGame.mix(300);
  tagGame.draw();
  canvas.onclick = function (e) {
    let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    let y = (e.pageY - canvas.offsetTop) / cellSize | 0;
    onEvent(x, y);
  };
  canvas.ontouchend = function (e) {
    let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
    let y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;
    onEvent(x, y);
  };

  function onEvent(x, y) {
    tagGame.move(x, y);
    if (isSoundOn) {
      playBip();
    }
    context.fillStyle = '#aaaaaa';
    context.fillRect(0, 0, canvas.width, canvas.height);
    tagGame.draw();
    if (tagGame.winners()) {
      document.body.classList.add('active');
      overlay.classList.add('active');
      winnerPopap.classList.add('active');
      popapText.textContent = "Hooray! You solved the puzzle in " + timerRef.textContent + " and " + tagGame.getMoves() + " moves!";
      clearInterval(int);
      let li = document.createElement('li');
      li.textContent = timerRef.textContent + "; " + tagGame.getMoves() + " moves!" + "; " + "Frame size: " + sizePuzzle;
      resultOl.append(li);
      resultArr.push(li.textContent);
      localStorage.setItem('results', JSON.stringify(resultArr));
      if (isSoundOn) {
        playWinner();
      }
    }
    localStorage.setItem('time', timerRef.textContent);
    moves.textContent = tagGame.getMoves();
    localStorage.setItem('moves', moves.textContent);
  }
}

window.onload = function () {
  clearInterval(int);
  [seconds, minutes] = [0, 0];
  timerRef.textContent = '00 : 00';
  int = setInterval(timer, 1000);
  moves.textContent = '0';
  nav.classList.remove('active');

  // shuffle puzzle
  startShuffle();
}