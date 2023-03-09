/* eslint-disable no-console */
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('input[name=name]');
  const MembershipPriceInput = document.querySelector('input[name=membership]');
  const descriptionTextarea = document.querySelector('textarea[name=description]');

  const membershipObject = {
    name: nameInput.value,
    price: MembershipPriceInput.value,
    description: descriptionTextarea.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(membershipObject),
  };

  fetch('http://localhost:8088/memberships', options)
    .then((res) => res.json)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => console.log(error));
});

document.getElementById('return').onclick = function toIndexPage() {
  window.location.href = 'index.html';
};
