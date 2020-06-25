const cards = document.querySelectorAll (".card")
const modalOverlay = document.querySelector (".modalOverlay")
const modal = document.querySelector(".modal")


for (let card of cards) {
    card.addEventListener("click", function(){
        
        const modalID = card.getAttribute("id")
        modalOverlay.querySelector("img").src= `assets/${modalID}`

        const modalTitle = card.children[1].textContent
        modalOverlay.querySelector(".modal-title h4").innerHTML = modalTitle
       
        const modalauthor = card.children[2].textContent
        modalOverlay.querySelector(".modal-author p").innerHTML = modalauthor

        modalOverlay.classList.add("active")
    })
}

document.querySelector(".closemodal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
})

