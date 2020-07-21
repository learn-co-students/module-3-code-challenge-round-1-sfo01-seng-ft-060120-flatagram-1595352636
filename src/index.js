const allComments = []

document.addEventListener('DOMContentLoaded', () => {
    fetchImage()
    fetchComments()
})

const fetchImage = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then(json => showImage(json))
}

const fetchComments = () => {
    fetch ('http://localhost:3000/comments')
    .then(res => res.json())
    .then(json => json.forEach(comment => addComments(comment)))
}

const addComments = (comment) => {
    allComments.push(comment)
}

const showImage = (image) => {
    const title = document.querySelector('.title')
    title.innerHTML = image.title

    const likes = document.querySelector('.likes')
    likes.innerHTML = `${image.likes} likes`

    const showImage = document.querySelector('.image')
    showImage.src = image.image
    const comments = document.querySelector('ul')
    comments.innerHTML = ''

    allComments
    allComments.forEach (comment => {
        let thisComment = document.createElement('li')
        thisComment.innerText = comment.content
        comments.appendChild(thisComment)
    })

    const likeButton = document.querySelector('.like-button')
    likeButton.addEventListener('click', (e) => {
        likeImage(e, image)
    })

    const commentForm = document.querySelector('.comment-form')
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        createComment(e, image)
    })
}

const likeImage = (e, image) => {
    
    let data = {
        likes: image.likes += 1
    }

    fetch(`http://localhost:3000/images/${image.id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            let likes = document.querySelector('.likes')
            likes.innerHTML = `${image.likes} likes`
        })      
}

const createComment = (e, image) => {

    let ul = document.createElement('ul')
    ul.innerHTML = e.target[0].value

    let data = {
        imageId: image.id,
        content: e.target[0].value
    }

    fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            const comments = document.querySelector('ul')
            comments.appendChild(ul)
        }) 
    }