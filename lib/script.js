//define variables
let cards = [...document.querySelectorAll(".cards")]
let board = document.querySelector(".board")
let cardFillers = document.querySelectorAll(".text")
//randomize card order
//contents = contents.map(item=>item).sort(randomize)

randomCards = cards.sort(randomize)
console.log(randomCards/* .forEach(randomCard=>randomCard.innerhtml) */)
//make each card clickable so when clicked the info on it will show or hide
cards.forEach(card => card.addEventListener("click", event => {
    event.preventDefault()
    card.querySelector(".text").classList.toggle("hide")
}))
console.log(Math.floor(Math.random()*cards.length))
//randomize card order


function randomize(a,b){
  return Math.random()-.5
}

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
cardFillers[0].innerHTML=content[0].word
console.log(content)
console.log(cardFillers[0])
/*
[] if 2 divs have class hide toggled to off, no more cards can toggle off.
    [] if a third card is clicked, alert player to hide others first 
[] Each click = a move, find a way to track each click and display it as a counter
[] solve the shuffle bug, perhaps with a shuffle button for now
[] figure out how to link 2 cards together, so they are recognized as a pair and disappear

 */