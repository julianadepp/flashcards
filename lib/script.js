//define variables
let cards = [...document.querySelectorAll(".cards")]
let board = document.querySelector(".board")
let cardFillers = document.querySelectorAll(".text")
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
    }
]
let showingCards = []

//add click functionality to each card
cards.forEach(card => card.addEventListener("click", event => {
    event.preventDefault()
    card.querySelector(".text").classList.toggle("hide")
    if (showingCards.length>=2){
        alert("Stop! thats too many cards")
    } else if (card.querySelector(".text").classList.contains("hide") == false) {
        showingCards.push("item")
        console.log(showingCards)
    } else if (card.querySelector(".text").classList.contains("hide") == true) {
        showingCards.pop()
        console.log(showingCards)
    }
}))

/* if (cards[0].querySelector(".text").classList.contains("hide") == true) {
    console.log ("hidden")
} */



//randomizer fucntion
function randomize(a,b){
  return Math.random()-.5
}

//randomize order of pair (as of now they stay in pairs still...)
content.sort(randomize)

//puts content on each card by pulling from the objects in the content array
for (let i=0; i<cardFillers.length; i++){
    if ((i%2)==0){
    cardFillers[i].innerHTML=content[i/2].word
    } else if ((i%2)==1){
        cardFillers[i].innerHTML=content[(i-1)/2].def
    }
}
console.log(cardFillers)





/*
[] if 2 divs have class hide toggled to off, no more cards can toggle off.
    [] if a third card is clicked, alert player to hide others first 
[] Each click = a move, find a way to track each click and display it as a counter
[] solve the shuffle bug, perhaps with a shuffle button for now
[] figure out how to link 2 cards together, so they are recognized as a pair and disappear

 */