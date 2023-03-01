
fetch("/data.json")
.then(res => res.json())
.then(data => {
    const ul = document.createElement("ul");
    data.array.forEach(item => {
        const li = document.createElement("li");        
            li.innerText = item;
            ul.appendChild(li);
    });
    document.body.appendChild(ul);
})
.catch(error => console.error(error));

