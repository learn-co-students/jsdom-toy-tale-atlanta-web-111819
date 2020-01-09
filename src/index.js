let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderData(json));

  function renderData(json){
    json.forEach(toy => {

    
    createCard(toy);
  })
  }

  function createCard(toy){
    let toyBox = document.getElementById("toy-collection")
    let div = document.createElement("div")
    div.className = 'card'
    div.setAttribute("id", toy.id)

    let hDiv = document.createElement("h2")
    hDiv.textContent = toy.name

    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"

    let p = document.createElement("p")
    p.textContent = toy.likes

    let button = document.createElement("button")
    button.className = "like-btn"
    button.textContent = "like <3"
    button.addEventListener("click", addLike)

    div.appendChild(hDiv)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)

    toyBox.appendChild(div)
  }

  function addLike(e){
    let p = e.target.parentElement.querySelector("p")
    let likes = parseInt(p.textContent) + 1

    sendLike(e.target.parentElement.id, likes, p);
  }

  function sendLike(id, likes, p){
    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "likes": likes
      })
    }
    fetch(`http://localhost:3000/toys/${id}`, options)
    .then(resp => resp.json())
    .then(toy => p.textContent = toy['likes'])
    .catch(err => alert("Database goof"));
  }

  let newToyForm = document.querySelector(".add-toy-form")

  newToyForm.addEventListener("submit", addToy)

  function addToy(e){
    e.preventDefault();
    let val = {
      name: e.target['name'].value,
      image: e.target['image'].value,
      likes: 0
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(val)
    }

    fetch('http://localhost:3000/toys', options)
    .then(resp => resp.json())
    .then(json => createCard(json))
    .catch(err => alert("Database goofed"));

    e.target.reset();
    toyForm.style.display = 'none';


  }




})
