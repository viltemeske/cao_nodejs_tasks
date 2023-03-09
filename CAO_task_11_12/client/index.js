/* eslint-disable no-console */
const handleDelete = (id) => {
  const params = { method: 'DELETE' };
  fetch(`http://localhost:8088/memberships/${id}`, params)
    .then((res) => res.json)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => console.log(error));
};

const renderCard = (service) => {
  const card = document.createElement('div');
  const info = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const actions = document.createElement('div');
  const deleteButton = document.createElement('span');
  const icon = document.createElement('i');

  card.className = 'card';
  info.className = 'info';
  actions.className = 'actions';
  deleteButton.className = 'delete-button';
  icon.className = 'fa-solid fa-trash';

  deleteButton.addEventListener('click', () => handleDelete(service.id));

  title.textContent = `$${service.price} ${service.name}`;
  description.textContent = service.description;

  info.append(title, description);

  deleteButton.append(icon);
  actions.append(deleteButton);

  card.append(info, actions);

  document.querySelector('.cards').append(card);
};

const fetchMemberships = () => {
  fetch('http://localhost:8088/memberships')
    .then((resp) => resp.json())
    .then((response) => {
      response.forEach((service) => renderCard(service));
    })
    .catch((error) => console.error(error));
};

fetchMemberships();

document.getElementById('add').onclick = function toCreateMembership() {
  window.location.href = 'new-membership-page.html';
};
