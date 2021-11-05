let cards = document.querySelectorAll(".cards")
console.log(cards)
cards.forEach(card => card.addEventListener("click", event => {
    event.preventDefault()
    card.querySelector(".text").classList.toggle("show")
}))
