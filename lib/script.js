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
//randomize order of pair (as of now they stay in pairs still...)
content.sort(randomize)

//any empty array that populates as cards are clicked, so number showing can be tracked and no more than 2 can show at a time


let showingCards = []


//add click functionality to each card
cards.forEach(card => card.addEventListener("click", event => {
    event.preventDefault()
    //everytime a card is clicked, the toggle method turns the class hide on and off
    let textHolder = card.querySelector(".text")
    textHolder.classList.toggle("hide")

    //if the showing cards array is at 2 and the clicked card is asked to display, then say "thats too many cards" and force class to "hide"
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

//puts content on each card by pulling from the objects in the content array 
// also adds class=content.word for both the word card and definition card, linking them together
for (let i=0; i<cardFillers.length; i++){
    if ((i%2)==0){
        cardFillers[i].innerHTML=content[i/2].word
        cardFillers[i].classList.add(content[i/2].word)
    } else if ((i%2)==1){
        cardFillers[i].innerHTML=content[(i-1)/2].def
        cardFillers[i].classList.add(content[(i-1)/2].word)
    }
}
console.log(cardFillers)

//if 2 cards come from the same object in the content array, they turn pink (disappearing in effect)
    // for each showing card, if paragraph inner text index == index of another showing card, color is pink
function match(){
    //if the class names for the elements currently pushed to showingCards match each other (since the for loop assigns the same class for word and definintion) then console log "match"
    if (showingCards[0].className==showingCards[1].className){
        console.log("its a match!!")
        addPair()
        border()
        //make cards disappear without causing everything to shift(like display:none would)
        setTimeout(disappear,1500)
        showingCards=[]
    }
}    

        
//randomizer fucntion
function randomize(a,b){
    return Math.random()-.5
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
            //makes cards disappear immediately so you can't see the matching card, need to add a timer or soemthing
            cardFiller.parentElement.style.opacity = 0
        }
    })
}
function border(){
    cardFillers.forEach(cardFiller => {
        if (cardFiller.classList.contains("hide")==false){
            //makes cards disappear immediately so you can't see the matching card, need to add a timer or soemthing
            cardFiller.parentElement.style.border = "4px solid green"
        }
    })
}



/*
[x] if 2 divs have class hide toggled to off, no more cards can toggle off.
    [x] if a third card is clicked, alert player to hide others first 
[] Each click = a move, find a way to track each click and display it as a counter
[] solve the shuffle bug, perhaps with a shuffle button for now
[x] figure out how to link 2 cards together, so they are recognized as a pair and disappear

 */