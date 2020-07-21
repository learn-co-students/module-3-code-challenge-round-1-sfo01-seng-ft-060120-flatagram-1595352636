// write your code here
document.addEventListener('DOMContentLoaded', (e) => {

    const getData = () => {
        fetch('http://localhost:3000/images/1')
        .then(res => res.json())
        .then(json => renderImageCard(json))
    }

    getData()

    const renderImageCard = (image) => {
        let div = document.querySelector('.image-card')

        let h2 = div.querySelector('.title')
        h2.innerText = image.title

        let img = div.querySelector('.image')
        img.src = image.image

        let divLikesSection = div.querySelector('.likes-section')
        let span = divLikesSection.querySelector('.likes')
        span.innerText = `${image.likes} likes`

        // dislike button
        let dislikeButton = document.createElement('button')
        dislikeButton.className = 'dislike-button'
        dislikeButton.innerText = '👎'
        divLikesSection.appendChild(dislikeButton)

        let ul = div.querySelector('.comments')

        // clear existing
        ul.innerHTML = ''

        image.comments.forEach(comment => {
            let li = document.createElement('li')
            li.innerText = comment.content

            createDeleteButton(li, comment.id)

            ul.appendChild(li)
        })

        // event listener for likes
        let likeButton = div.querySelector('.like-button')
        likeButton.addEventListener('click', (e) => adjustLikes(e, image, true))

        dislikeButton.addEventListener('click', (e) => adjustLikes(e, image, false))

        // add comment
        let form = div.querySelector('.comment-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let newComment = e.target[0].value

            fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageId: 1,
                    content: newComment
                })
            })
            .then(res => res.json())
            .then(json => {
                //pessimistic rendering to pass through comment id (for deleting)
                let li = document.createElement('li')
                li.innerText = json.content
                createDeleteButton(li, json.id)
                ul.appendChild(li)
                e.target.reset()
            })
        })        
        
    }

    const adjustLikes = (e, image, like) => {
        // increment/decrement depending on like/dislike
        like ? image.likes += 1 : image.likes -= 1

        let data = {likes: image.likes}
        fetch('http://localhost:3000/images/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            let likeSpan = document.querySelector('.likes')
            likeSpan.innerText = `${json.likes} likes`
        })
    }

    // delete button with event listener
    const createDeleteButton = (li, id) => {
        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'x'
        li.appendChild(deleteButton)

        deleteButton.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/comments/${id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(json => {
                let ul = document.querySelector('.comments')
                ul.removeChild(li)
            })
        })
    }
})