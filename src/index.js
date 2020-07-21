// write your code here

// fetch dog data
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
                <div>
                    <button class="like-button">❤️</button>
                    <button class="dislike-button">💔</button>
                </div>
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
    likeButton.addEventListener('click', () => {
        let dogData = {
            likes: dog.likes += 1
        }
        alterDogLikes(dogData)
    })

    let dislikeButton = document.querySelector('button.dislike-button')
    dislikeButton.addEventListener('click', () => {
        let dogData = {
            likes: (dog.likes -= 1)
        }
        alterDogLikes(dogData)
    })

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
    commentLi.id = `comment-${comment.id}`
    commentLi.innerHTML = `
        ${comment.content}
        <button class='delete-comment'>❎</button>
    `
    let deleteCommentButton = commentLi.querySelector('button')
    deleteCommentButton.addEventListener('click', () => deleteComment(comment))

    commentUl.appendChild(commentLi)
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

// delete comment
const deleteComment = (comment) => {
    fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(document.getElementById(`comment-${comment.id}`).remove())
}

// alter dog likes
const alterDogLikes = (dogData) => {
    fetch(`http://localhost:3000/images/1`, {
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

// method calls
fetchDogData()