// write your code here
// fetch image data
const fetchDogData = () => {
    fetch(`http://localhost:3000/images/1`)
    .then(res => res.json())
    .then(json => buildDogCard(json))
}


const buildDogCard = (dog) => {
    let card = document.getElementsByClassName('image-card')[0]
    card.innerHTML = `
        <h2 class="title">${dog.title}</h2>
        <img src="${dog.image}" class="image" />
        <div class="likes-section">
            <span class="likes">${dog.likes} likes</span>
            <button class="like-button">♥</button>
        </div>
        <ul class="comments"> </ul>
        <form class="comment-form">
            <input
                class="comment-input"
                type="text"
                name="comment"
                placeholder="Add a comment..."
            />
            <button class="comment-button" type="submit">Post</button>
        </form>
    `
    fetchAllComments()

    let likeButton = document.querySelector('button.like-button')
    likeButton.addEventListener('click', () => addLikes(dog))

    let commentForm = document.querySelector('form')
    commentForm.addEventListener('submit', (e) => addAComment(e))
}

// fetch comments
const fetchAllComments = () => {
    fetch(`http://localhost:3000/comments`)
    .then(res => res.json())
    .then(json => json.forEach(comment => buildOneComment(comment)))
}

const buildOneComment = (comment) => {
    let commentUl = document.querySelector('ul')
    let commentLi = document.createElement('li')
    commentLi.textContent = comment.content
    commentUl.appendChild(commentLi)
}

// like button
const addLikes = (dog) => {
    dog.likes += 1
    let dogData = {
        likes: dog.likes
    }

    fetch(`document.querySelector('button.comment-button')/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dogData)
    })
    .then(res => res.json())
    .then(json => {
        let likeCount = document.querySelector('span')
        likeCount.textContent = `${json.likes} likes` 
    })
}

// add a comment
const addAComment = (e) => {
    e.preventDefault()

    let commentData = {
        imageId: 1,
        content: e.target[0].value
    }

    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(commentData)        
    })
    .then(res => res.json())
    .then(json => buildOneComment(json))

    document.querySelector('form').reset()
}

// method calls
fetchDogData()