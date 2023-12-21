// write your code here!


//mantra: 
// 1. FETCH THE DATA
//2. SELECT THE DOM ELEMENTS
//3.CREATE DOM ELEMENTS
//4. ASSIGN DATA TO THE ELEMENTS
//5. APPEND ELEMENTS INTO THE DOM


//global variables
const ducksURL = 'http://localhost:3000/ducks'
let selectedDuck; //let lets you declare and assign later

//DOM selectors
const duckNav = el("duck-nav");
const duckDisplayName = el("duck-display-name");
const duckDisplayImage = el("duck-display-image");
const duckDisplayLikes = el("duck-display-likes");
const newDuckForm = el("new-duck-form")

//fetch function
function getDucks(ducksURL){
    return fetch(ducksURL)
    .then(resp => resp.json())
    .then(duckArr => renderAllDucksInNav(duckArr));
}
getDucks(ducksURL)

//event listeners 
duckDisplayLikes.addEventListener('click', addLikes)
newDuckForm.addEventListener('submit', handleDuckSubmit)

function handleDuckSubmit(e){
    e.preventDefault();
    const name = e.target["duck-name-input"].value
    const img_url = e.target["duck-image-input"].value
    const newDuck = {
        name,
        img_url,
        likes: 0
    }
    renderOneDuckInNav(newDuck)
    e.target.reset()
}

function addLikes(){
    selectedDuck.likes += 1
    renderDisplayDuck(selectedDuck)
}


//render functions
function renderAllDucksInNav(duckArr){
   // console.log(duckArr)
duckArr.forEach(renderOneDuckInNav);
}

function renderOneDuckInNav(duckObj){
// console.log(renderOneDuckInNav)
const duckImage = document.createElement('img');
duckImage.src = duckObj.img_url;
duckImage.addEventListener('click', ()=> renderDisplayDuck(duckObj) );//more useful to place it here where we created it 
duckNav.append(duckImage); //"oldelement.append(newelement"
//console.log(duckImage)
//good place to add event listener since we have it hereand have total control of the duck images in nav 
}
function renderDisplayDuck(duckObj){
   // console.log(duckObj);
   selectedDuck = duckObj;
    duckDisplayName.textContent = duckObj.name,
    duckDisplayImage.src = duckObj.img_url,
    duckDisplayLikes.textContent = `${duckObj.likes} likes`
}

//function to get elements
function el(id){
    return document.getElementById(id);
}