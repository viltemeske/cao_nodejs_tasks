/* eslint-disable no-console */
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('input[name=name]');
  const surnameInput = document.querySelector('input[name=surname]');
  const emailInput = document.querySelector('input[name=email]');
  const membershipInput = document.querySelector('select[name=membership]');

  const userObject = {
    name: nameInput.value,
    surname: surnameInput.value,
    email: emailInput.value,
    service_id: membershipInput.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
  };
  console.log(options);

  fetch('http://localhost:8088/users', options)
    .then((res) => res.json)
    .then(() => {
      window.location.href = 'users-page.html';
    })
    .catch((error) => console.log(error));
});

document.getElementById('return').onclick = function toUserPage() {
  window.location.href = 'users-page.html';
};
