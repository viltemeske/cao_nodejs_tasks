fetch('api/list')
    .then(res => res.text())
    .then(html => {
        const list = document.getElementById('list');
        list.innerHTML = html;
    })
    .catch(error => console.error(error));