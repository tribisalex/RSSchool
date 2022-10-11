const overlay = document.getElementById('overlay');
const overlayDonate = document.getElementById('overlay-donate');
const nav = document.getElementById('nav');

const testimonialsBlockItem = document.querySelectorAll('.testimonials-block-item');
const popapTestimonials = document.querySelector('.popap-testimonials');
const testimonialsUsername = document.querySelector('.testimonials-username');
const testimonialsLocal = document.querySelector('.testimonials-local-modal');
const testimonialsDay = document.querySelector('.testimonials-day-modal');
const textFeedbackModal = document.querySelector('.text-feedback__modal');


document.onclick = e => {
  if (e.target.id === 'overlay' || e.target.id === 'close-menu' || e.target.id === 'overlay-donate' || e.target.id === 'close-popap') {
    document.body.classList.remove('active');
    overlay === null ? '' : overlay.classList.remove('active');
    overlayDonate === null ? '' : overlayDonate.classList.remove('active');
    nav.classList.remove('active');
    popapTestimonials.classList.remove('active');
  } else if (e.target.id === 'menuburger_item' || e.target.id === 'menuburger') {
    nav.classList.add('active');
    overlay === null ? '' : overlay.classList.add('active');
    overlayDonate === null ? '' : overlayDonate.classList.add('active');
  }
};

//popap testionials
testimonialsBlockItem.forEach(item => {
  // console.log(testimonialsBlockItem);
  item.addEventListener('click', () => {
    const username = item.querySelector('.testimonials-block-item-username');
    const local = item.querySelector('.testimonials-local');
    const day = item.querySelector('.testimonials-day');
    const textFeedback = item.querySelector('.text-feedback');
    popapTestimonials.classList.add('active');
    overlay.classList.add('active');
    testimonialsUsername.textContent = username.textContent;
    testimonialsLocal.textContent = local.textContent;
    testimonialsDay.textContent = day.textContent;
    textFeedbackModal.textContent = textFeedback.textContent;
  })
})

//carousel testionials
var elem = document.querySelector('input[type="range"]');
var target = document.querySelector('.testimonials-block-row');

function rangeValue() {
  var newValue = elem.value;
  if (document.documentElement.clientWidth > 1050) {
    target.style.left = -(newValue * 269 + newValue * 28).toString() + 'px';
  }
  if (document.documentElement.clientWidth > 720 && document.documentElement.clientWidth <= 1050) {
    target.style.left = -(newValue * 292 + 28 * newValue).toString() + 'px';
  }
}

elem.addEventListener("input", rangeValue);


//carousel pets
const pets = [
  {
    id: '1',
    image: '../../assets/images/aligate.png',
    name: 'Alligators',
    native: 'Native to Antarctica',
    food_ico: '../../assets/icons/meet-fish_icon.png'
  },
  {
    id: '2',
    image: '../../assets/images/Gorillas.jpg',
    name: 'Gorillas',
    native: 'Native to Congo',
    food_ico: '../../assets/icons/banana-bamboo_icon.png'
  },
  {
    id: '3',
    image: '../../assets/images/Panda.jpg',
    name: 'Giant Pandas',
    native: 'Native to Southwest China',
    food_ico: '../../assets/icons/banana-bamboo_icon.png'
  },
  {
    id: '4',
    image: '../../assets/images/Eagles.jpg',
    name: 'Eagles',
    native: 'Native to South America',
    food_ico: '../../assets/icons/meet-fish_icon.png'
  }, {
    id: '5',
    image: '../../assets/images/Cheetas.jpg',
    name: 'Cheetahs',
    native: 'Native to Africa',
    food_ico: '../../assets/icons/meet-fish_icon.png'
  },
  {
    id: '6',
    image: '../../assets/images/Penguinis.jpg',
    name: 'Penguins',
    native: 'Native to Antarctica',
    food_ico: '../../assets/icons/meet-fish_icon.png'
  },
  {
    id: '7',
    image: '../../assets/images/Sloth.jpg',
    name: 'Two-toed Sloth',
    native: 'Mesoamerica, South America',
    food_ico: '../../assets/icons/banana-bamboo_icon.png'
  },
]

const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const petsBlockRow1 = document.querySelector('.pets-block__row-1');
const petsBlockRow2 = document.querySelector('.pets-block__row-2');

arrowRight.addEventListener('click', changeRight);
arrowLeft.addEventListener('click', changeLeft);

function changeRight () {
  arrowRight.disabled = true;
  arrowRight.disabled = true;
  let petsList = [...pets];
  shuffle(petsList);
  for (let i = 0; i < 3; i++) {
    let divRow1 = document.createElement('div');
    divRow1.className = "pets-card";
    divRow1.innerHTML = `<div class="pets-card-img"><img src="${petsList[i].image}" alt="panda"></div>
                        <div class="pets-card-description"><div class="pets-card-description-item"><div class="pets-name">${petsList[i].name}</div><div class="pets-native">${petsList[i].native}</div></div>
                            <div class="herbivore"><img src="${petsList[i].food_ico}" alt="food"></div></div>`;
    petsBlockRow1.append(divRow1);
    let divRow2 = document.createElement('div');
    divRow2.className = "pets-card";
    divRow2.innerHTML = `<div class="pets-card-img">
                            <img src="${petsList[i + 3].image}" alt="panda">
                        </div>
                        <div class="pets-card-description">
                            <div class="pets-card-description-item">
                                <div class="pets-name">${petsList[i + 3].name}</div>
                                <div class="pets-native">${petsList[i + 3].native}</div>
                            </div>
                            <div class="herbivore">
                                <img src="${petsList[i + 3].food_ico}" alt="food">
                            </div>
                        </div>`;
    petsBlockRow2.append(divRow2);
  }
  petsBlockRow1.style.transition = "700ms";
  petsBlockRow2.style.transition = "700ms";
  petsBlockRow1.style.transform = "translateX(-50%)";
  petsBlockRow2.style.transform = "translateX(-50%)";

  setTimeout(() => {
    petsBlockRow1.firstElementChild.remove();
    petsBlockRow1.firstElementChild.remove();
    petsBlockRow1.firstElementChild.remove();
    petsBlockRow2.firstElementChild.remove();
    petsBlockRow2.firstElementChild.remove();
    petsBlockRow2.firstElementChild.remove();
    petsBlockRow1.style.transition = "0ms";
    petsBlockRow2.style.transition = "0ms";
    petsBlockRow1.style.transform = "translateX(0%)";
    petsBlockRow2.style.transform = "translateX(0%)";
    arrowRight.disabled = false;
    arrowLeft.disabled = false;
  }, 700);
}

function changeLeft() {
  arrowLeft.disabled = true;
  arrowRight.disabled = true;
  let petsList = [...pets];
  shuffle(petsList);
  petsBlockRow1.style.transition = "0ms";
  petsBlockRow2.style.transition = "0ms";
  petsBlockRow1.style.transform = "translateX(-50%)";
  petsBlockRow2.style.transform = "translateX(-50%)";

  for (let i = 0; i < 3; i++) {
    let divRow1 = document.createElement('div');
    divRow1.className = "pets-card";
    divRow1.innerHTML = `<div class="pets-card-img">
                            <img src="${petsList[i].image}" alt="panda">
                        </div>
                        <div class="pets-card-description">
                            <div class="pets-card-description-item">
                                <div class="pets-name">${petsList[i].name}</div>
                                <div class="pets-native">${petsList[i].native}</div>
                            </div>
                            <div class="herbivore">
                                <img src="${petsList[i].food_ico}" alt="food">
                            </div>
                     </div>`;
    petsBlockRow1.prepend(divRow1);
    let divRow2 = document.createElement('div');
    divRow2.className = "pets-card";
    divRow2.innerHTML = `<div class="pets-card-img">
                            <img src="${petsList[i + 3].image}" alt="panda">
                        </div>
                        <div class="pets-card-description">
                            <div class="pets-card-description-item">
                                <div class="pets-name">${petsList[i + 3].name}</div>
                                <div class="pets-native">${petsList[i + 3].native}</div>
                            </div>
                            <div class="herbivore">
                                <img src="${petsList[i + 3].food_ico}" alt="food">
                            </div>
                        </div>`;
    petsBlockRow2.prepend(divRow2);
  }

  setTimeout(() => {
    petsBlockRow1.style.transition = "700ms";
    petsBlockRow2.style.transition = "700ms";
    petsBlockRow1.style.transform = "translateX(0%)";
    petsBlockRow2.style.transform = "translateX(0%)";
  }, 0);

  setTimeout(() => {
    petsBlockRow1.lastElementChild.remove();
    petsBlockRow1.lastElementChild.remove();
    petsBlockRow1.lastElementChild.remove();
    petsBlockRow2.lastElementChild.remove();
    petsBlockRow2.lastElementChild.remove();
    petsBlockRow2.lastElementChild.remove();
    petsBlockRow1.style.transition = "0ms";
    petsBlockRow2.style.transition = "0ms";
    arrowLeft.disabled = false;
    arrowRight.disabled = false;
  }, 700);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}