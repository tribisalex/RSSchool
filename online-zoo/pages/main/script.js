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
testimonialsBlockItem.forEach((item, index) => {
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