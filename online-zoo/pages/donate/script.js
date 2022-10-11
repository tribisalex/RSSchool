// Amount
const priceInput = document.querySelector('.price-input');
const inputRadio = document.querySelectorAll('.amount-radio');
const amountSlider = document.querySelector('.amount-slider');

function checkLength(len, ele) {
  var fieldLength = ele.value.length;
  if (fieldLength <= len) {
    return true;
  } else {
    var str = ele.value;
    str = str.substring(0, str.length - 1);
    ele.value = str;
  }
}

amountSlider.addEventListener('click', () => {
  inputRadio.forEach(item => {
    if (item.checked === true) {
      priceInput.value = item.value;
    }
  })
})

priceInput.addEventListener('input', () => {
  inputRadio.forEach(item => {
    if (priceInput.value === item.value) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  })
})