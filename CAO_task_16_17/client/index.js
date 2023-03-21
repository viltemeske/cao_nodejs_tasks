const handleDelete = (id) => {
  const params = { method: 'DELETE' };
  fetch(`http://localhost:8080/cars/${id}`, params)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Failed to delete car: ${error.message}`;
      document.querySelector('.cards').append(errorMessage);
    });
};

const renderCard = (car) => {
  const card = document.createElement('div');
  const info = document.createElement('div');
  const numberplates = document.createElement('h2');
  const title = document.createElement('p');
  const price = document.createElement('p');
  const image = document.createElement('img');
  const actions = document.createElement('div');
  const deleteButton = document.createElement('span');

  card.className = 'card';
  info.className = 'info';
  actions.className = 'actions';
  deleteButton.className = 'button';

  deleteButton.addEventListener('click', () => handleDelete(car.carId));

  numberplates.textContent = `${car.numberplates}`;
  title.textContent = car.title;
  price.textContent = `${car.price} €`;
  image.src = car.image;
  deleteButton.textContent = 'DELETE';

  info.append(numberplates, title, price, image);

  actions.append(deleteButton);

  card.append(info, actions);

  document.querySelector('.cards').append(card);
};

const fetchCars = () => {
  fetch('http://localhost:8080/cars')
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to fetch cars');
      }
      return resp.json();
    })
    .then((response) => {
      response.forEach((car) => renderCard(car));
    })
    .catch((error) => {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Failed to fetch cars';
      document.querySelector('.cards').append(errorMessage);
      console.error(error);
    });
};

fetchCars();
