//define some variables
let board = document.querySelector(".board")

//array of objects for each pair
let content = [
    {
        word:"yes",
        def: "lorem"
    },
    {
        word:"foo",
        def:"ipsum"
    },
    {
        word:"bar",
        def:"dolor"
    },
    {
        word:"juliana",
        def:"depp"
    },
   /*  {
        word:"jess",
        def:"bauer"
    } */
]
//creates an array from the word key
let words = content.map(object=>object.word)
//another array from def key
let definitions = content.map(object=>object.def)
console.log(definitions)
console.log(words)
let allContent = words.concat(definitions)
console.log(allContent)
//makes cards for as many as needed given the numver of objects
for (let i=0; i<content.length*2; i++){
    cardMaker()
}

//define variables
let cards = [...document.querySelectorAll(".cards")]
let cardFillers = document.querySelectorAll(".text")
let resetButton = document.querySelector("#reset")
let undoButton = document.querySelector("#undo")
let shuffleButton = document.querySelector("#shuffle")

//add shuffle button functionality something doesn't seem to work right here... console logs but cards dont actually match
shuffleButton.addEventListener("click",()=>{
    shuffle(content)
    console.log(content)
})

//puts content on each card by pulling from the objects in the content array 
// also adds class=content.word for both the word card and definition card, linking them together
for (let i=0; i<cardFillers.length; i++){
    if ((i%2)==0){
        cardFillers[i].innerHTML=words[i/2]
        cardFillers[i].classList.add(words[i/2])
    } else if ((i%2)==1){
        cardFillers[i].innerHTML=definitions[(i-1)/2]
        cardFillers[i].classList.add(words[(i-1)/2])
    }
}
console.log(cardFillers)

//randomize order of pair (as of now they stay in pairs still...)
//content.sort(randomize)

//any empty array that populates as cards are clicked, so number showing can be tracked and no more than 2 can show at a time
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
        setTimeout(disappear,1500)
        //resets array so player doesnt have to unclick matching pairs to avoid error alert
        showingCards=[]
    }
}    

        
function cardMaker(){
    let card = document.createElement("div")
    let content = document.createElement("p")
    card.appendChild(content)
    board.appendChild(card)
    card.setAttribute("class", "cards")
    content.setAttribute("class", "text hide")
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
function randomize(a,b){
    return Math.random()-.5
}
// fisher Yates randomizer??from here: "https://bost.ocks.org/mike/shuffle/"
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
/*
[x] if 2 divs have class hide toggled to off, no more cards can toggle off.
    [x] if a third card is clicked, alert player to hide others first 
[] Each click = a move, find a way to track each click and display it as a counter
[] solve the shuffle bug, perhaps with a shuffle button for now
[x] figure out how to link 2 cards together, so they are recognized as a pair and disappear

 */