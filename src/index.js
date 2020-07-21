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
    console.log(dog.likes)
    let dogData = {
        likes: dog.likes
    }
}

// method calls
fetchDogData()