const fetchImage = () => {
    fetch('http://localhost:3000/images')
    .then(res => res.json() )
    .then(json => renderImage(json))
}

fetchImage();

function renderImage (json) {
    const imageContainer = document.querySelector("image-container")

    json.forEach ( image => {
        let imageCard = document.querySelector("image-card")

        imageCard.innerHTML = ''
        imageCard.innerHTML = image.img 

        let imageTitle = document.querySelector("title")
        imageTitle.innerHTML = image.title 

        let imageLikes = document.querySelector("likes")
        imageTitle.innerHTML = image.title 

        let imageComment = document.
        imageComment.innerHTML = image.comment

        imageCard.appendChild(imageTitle)
        imageCard.appendChild(imageLikes)
        imageCard.appendChild(imageComment)
    })

}

function incrementLikes(e, image) {

    image.likes ++
      
    fetch(`http://localhost:3000/images/${image.id}`, {
      method:'PATCH',
      headers: {
        'Content-Type':'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({likes: image.likes})
    })
  }
  
