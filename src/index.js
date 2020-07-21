// write your code here
fetch('http://localhost:3000/images')
.then(function(response){
    return response.json()
})
.then(function(json){
    renderImage(json)
})

function renderImage(json){
    let div = document.querySelector('.image-card')

    div.innerHTML = `<h2 class="title">${json[0].title}</h2>
    <img src=${json[0].image} class="image" />
    <div class="likes-section">
      <span class="likes">0 likes</span>
      <button class="like-button">♥</button>
      <ul class="comments">
          
    </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>`
    let button = document.querySelector('.like-button')
    button.addEventListener('click', (e) => likes(e, json[0].image))
}

document.addEventListener('submit', (e) => comments(e))
function comments(e){
    e.preventDefault()
    let comments = document.querySelector('.comment-input')
    let ul = document.querySelector('.comments')
    let data = {comment: comments.value}
    
    let li = document.createElement('li')
    li.innerText = data.comment
    ul.appendChild(li)

    fetch(`http://localhost:3000/images/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
}

function likes(e, image){
    let count = parseInt(e.target.previousElementSibling.innerText)
    console.log(count)
    let data = {likes: count}
    fetch(`http://localhost:3000/images/${image.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        })
        .then(response => response.json())
        .then(data => {
            let num = 0
            num ++ 
            let newLikes = document.querySelector('.likes')
            newLikes.innerText = `${num} likes`

        })
}