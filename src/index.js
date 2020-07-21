document.addEventListener('DOMContentLoaded', function(){
  // load up your methods to show up on the dom here
  getImages();
})

// make a GET request, get all the images needed
// GET
const getImages = () => {
fetch('http://localhost:3000/images/1')
.then(res => res.json())
// .then(json => console.log(json))
.then(json => renderImage(json))
}

// we need to render the dogs on the page

const renderImage = (images) => {
// console.log(images)
  let card = document.getElementsByClassName('image-card')[0]

  let title = document.getElementsByClassName('title')[0]
  title.innerText = `${images.title}`
  
  // let image = document.getElementById("img").src;
  // image.innerText = `${images.image}`

  let likes = document.getElementsByClassName('likes')[0]
  likes.innerText = `${images.likes}`

  // debugger

}


// create POST request to post comments

const postAllComments = () => {

  e.preventDefault()

  let data =  {
    "id": 1,
    "imageId": 1,
    "content": "What a cute dog!"
  }

  fetch('http://localhost:3000/comments', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      // Accept: "application/json" 
    },
    body: JSON.stringify(data) 
  })
  .then(res => res.json())
  .then(json => renderImage(json))
  
}



// Post Comments
const renderComments = (comments) => {
  let comment = document.getElementsByClassName('comments')[0]
  let li = document.querySelectorAll('li')
  li.innerText = `${comment.content}`

// console.log(comment)
}

// const likes = () => {
//   aLike = document.querySelector('.span')

// }

// create eventListener for likes
// const likeButton = () => {
// let btn = document.querySelector('.button')
// btn.addEventListener('click', (e))
}
debugger



// <div class="likes-section">
// <span class="likes">0 likes</span>
// <button class="like-button">♥</button>
// </div>

