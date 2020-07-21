// write your code here


const ul = document.getElementById('images');


let images={};
fetch('http://localhost:3000/images/')
.then(response => response.json())
.then(images => {
      Object.keys(images).forEach((key) => {
        const img = document.createElement("img");
        img.setAttribute("src", images[key]);
      });
    })

