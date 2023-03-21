const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const numberplateInput = document.querySelector('input[name=numberplate]');
  const modelInput = document.querySelector('input[name=model]');
  const priceInput = document.querySelector('input[name=price]');
  const imageInput = document.querySelector('input[name=image]');

  const carObject = {
    numberplates: numberplateInput.value,
    title: modelInput.value,
    price: Number(priceInput.value),
    image: imageInput.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carObject),
  };

  fetch('http://localhost:8080/cars', options)
    .then((res) => res.json)
    .then(() => {
      window.location.href = './index.html';
    })
    .catch((error) => console.log(error));
});

document.getElementById('return').onclick = function toIndexPage() {
  window.location.href = './index.html';
};
