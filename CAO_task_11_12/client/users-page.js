let orderSelection = 'asc';

function displayData(data) {
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';

  data.forEach((user) => {
    const fullName = document.createElement('h3');
    fullName.className = 'fullname';
    fullName.textContent = `${user.name} ${user.surname}`;

    const email = document.createElement('p');
    email.textContent = `Email Address: ${user.email}`;

    const membership = document.createElement('p');
    membership.textContent = `Membership: ${user.membership}`;

    const userinfo = document.createElement('div');
    userinfo.className = 'userinfo';
    userinfo.append(fullName, email, membership);

    const card = document.createElement('div');
    card.className = 'card';
    card.append(userinfo);

    cards.append(card);
  });
}

const fetchUsers = () => {
  fetch(`http://localhost:8088/users/${orderSelection}`)
    .then((resp) => resp.json())
    .then((data) => displayData(data));
};

fetchUsers();

document.getElementById('name').addEventListener('click', (e) => {
  const text = e.target.textContent;
  if (text.includes('ASC')) {
    e.target.textContent = text.replace('ASC', 'DSC');
    orderSelection = 'dsc';
  } else {
    e.target.textContent = text.replace('DSC', 'ASC');
    orderSelection = 'asc';
  }

  fetchUsers();
});

document.getElementById('add').onclick = function toCreateUser() {
  window.location.href = 'new-user-page.html';
};
