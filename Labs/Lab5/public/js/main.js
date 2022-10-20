const out = document.getElementById("demo");
let paragraph;
let NewImg;

function buttonClick(){
    fetch("http://localhost:3000/umbrellas")
    .then((response)=>{
            return response.text();
        }
    ).then((text)=>{
        let umbrellasArray = JSON.parse(text);
        umbrellasArray.forEach(element => {
            paragraph = document.createElement('p');
            paragraph.innerText=`id: ${element.id} 
            title: ${element.title} 
            radius: ${element.radius}`;
            NewImg = document.createElement('img');
            NewImg.src = `${element.image}`;
            out.appendChild(paragraph);
            out.appendChild(NewImg);
        });
    })
}