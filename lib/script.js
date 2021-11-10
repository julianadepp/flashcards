//define some variables
let board = document.querySelector(".board")
let contentElements = []       
//array of objects for each pair
// pulling from here for now:"https://www.kaptest.com/study/gre/top-52-gre-vocabulary-words/"
let content = [
    {
        word:"precipitate",
        def: "to cause (something) to happen quickly or suddenly"
    },
    {
        word:"adulturate",
        def:"to make (something) impure or weaker by adding something of inferior quality"
    },
    {
        word:"laconic",
        def:"using few words"
    },
    {
        word:"prevaricate",
        def:"avoid telling the truth by not directly answering a question"
    },
    {
        word:"engender",
        def:"to produce, cause, or give rise to (something)"
    }
]
//creates an array from the word key
let words = content.map(object=>object.word)
//another array from def key
let definitions = content.map(object=>object.def)

//makes cards for as many as needed given the numver of objects

for (let i=0; i<content.length*2; i++){
    cardMaker()
}

//define more variables
let cards = [...document.querySelectorAll(".cards")]
const resetButton = document.querySelector("#reset")
const undoButton = document.querySelector("#undo")
const HowtoButton = document.querySelector("#how")
const instructionsModal = document.querySelector("#instructions")
const closeButton = document.querySelector("#close")
const counter = document.querySelector("#counter")





//puts content on each p element (which is floating in the ether not appended to anything at this point) by pulling from the objects in the content array (kind of)
// also adds class=content.word for both the word card and definition card, linking them together
console.log(contentElements)

for (let i=0; i<contentElements.length; i++){
    if ((i%2)==0){
        contentElements[i].innerHTML=words[i/2]
        contentElements[i].classList.add(words[i/2])
    } else if ((i%2)==1){
        contentElements[i].innerHTML=definitions[(i-1)/2]
        contentElements[i].classList.add(words[(i-1)/2])
    }
}
//shuffles the array of p elements ~after~ they have their matching classes assigned but before being assigned to a card
shuffle(contentElements)
console.log(contentElements)
//assigns shuffled content to corresponding cards
for (let i=0; i<contentElements.length; i++){
    cards[i].appendChild(contentElements[i])
}
let cardFillers = document.querySelectorAll(".text")

//add shuffle button functionality something doesn't seem to work right here... console logs but cards dont actually match (abandoning shufflebutton ship for the moment)
/* shuffleButton.addEventListener("click",()=>{
    shuffle(content)
    console.log(content)
}) */

//an empty array that populates as cards are clicked, so number showing can be tracked and no more than 2 can show at a time
let showingCards = []
//add click functionality to each card
cards.forEach(card => card.addEventListener("click", event => {
    event.preventDefault()
    //everytime a card is clicked, the toggle method turns the class hide on and off
    let textHolder = card.querySelector(".text")
    textHolder.classList.toggle("hide")

    //if the showingCards array is at 2 and the clicked card is asked to display, then say "thats too many cards" and force class to "hide"
    if (showingCards.length>=2 && textHolder.classList.contains("hide") == false){
        textHolder.classList.add("hide")
        alert("Stop! thats too many cards")
    //if less than 2 cards are showing and one is asked to show, add an item to the showing cards list
    } else if (textHolder.classList.contains("hide") == false) {
        showingCards.push(textHolder)
        console.log(showingCards)
        counter.innerHTML = oneUp()
        match()
        //calls fuction to inform of match 
    //if a card is asked to hide, remove an item from the showing cards list
    } else if (textHolder.classList.contains("hide") == true) {
        //this has a bug, if hidden in different order than the wrong thing is popped (otherwise works)
        showingCards.pop()
        console.log(showingCards)
    }
}))

    function match(){
    //if the class names for the elements currently pushed to showingCards match each other (since the for loop assigns the same class for word and definintion) then console log "match"
    if (showingCards[0].className==showingCards[1].className){
        console.log("its a match!!")
        //marks pairs so if player moves quickly and opens another card during timer, only pairs will disappear
        addPair()
        //adds border so they see its a match while timer runs 
        border()
        //make cards disappear without causing everything to shift(like display:none would) and allows cards to stay on screen for 1.5 seconds before disappearing so they can read them
        setTimeout(disappear, 2000)
        //resets array so player doesnt have to unclick matching pairs to avoid error alert
        showingCards=[]
    }
}    

function cardMaker(){
    let card = document.createElement("div")
    let content = document.createElement("p")
    board.appendChild(card)
    card.setAttribute("class", "cards")
    content.setAttribute("class", "text hide")
    contentElements.push(content)
}


function addPair(){
    cardFillers.forEach(cardFiller => {
        if (cardFiller.classList.contains("hide")==false){
           cardFiller.classList.add("pair")
        }
    })
}

function disappear(){
    cardFillers.forEach(cardFiller => {
        if (cardFiller.classList.contains("pair")==true){
            cardFiller.parentElement.style.opacity = 0
        }
    })
}
function border(){
    cardFillers.forEach(cardFiller => {
        if (cardFiller.classList.contains("hide")==false){
            cardFiller.parentElement.style.border = "4px solid green"
        }
    })
}
//reset button triggers this function, it simply reloads the page for now
function resetBoard(){
    document.location.reload()
}
// old randomizer fucntion
/* function randomize(a,b){
    return Math.floor(Math.random()*cardFillers.length)
} */
//console.log(randomize())
// fisher Yates randomizer??from here: "https://bost.ocks.org/mike/shuffle/"
// m is a number representing the length of the array argument
//the while loop goes for as long as m exists, aka the duration of the array
// i is a random index generated from remaining array items
// t is the item from the end of the array
function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      //item at the end of array (holds it during swap)
      t = array[m];
      //sets end item to randomly chosen item
      array[m] = array[i];
      //sets randomly chosen item = to old end item (finishing the swap)
      array[i] = t;
    }
  //gives randomized array
    return array;
  }
// simple counter function for score keeping
let x = -1
function oneUp(){
    x+=1
    return x
}
console.log(oneUp())


/*
[x] if 2 divs have class hide toggled to off, no more cards can toggle off.
    [x] if a third card is clicked, alert player to hide others first 
[x] Each click = a move, find a way to track each click and display it as a counter
[x] solve the shuffle bug, perhaps with a shuffle button for now
[x] figure out how to link 2 cards together, so they are recognized as a pair and disappear

 */