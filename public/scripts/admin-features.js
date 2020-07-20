function addIngredient () {

    const ingredients = document.querySelector("#addIngredient")
    const fieldcontainer = document.querySelectorAll(".ingredient")

    const newField = fieldcontainer[fieldcontainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField)
}

const ingredients = document.querySelector(".addIngredient")

if(ingredients)

ingredients.addEventListener("click", addIngredient);


function addPreparation () {

const preparation = document.querySelector("#addPreparation")
const fieldcontainer = document.querySelectorAll(".preparation")

const newField = fieldcontainer[fieldcontainer.length -1].cloneNode(true);

if (newField.children[0].value="") return false;

newField.children[0].value = "";
preparation.appendChild(newField)

}

const preparation = document.querySelector(".addPreparation")

if(preparation)

preparation.addEventListener("click", addPreparation);







// SCRIPT DE HEADER

const currentPage = location.pathname

const menuitems = document.querySelectorAll("header #logo a")



for (item of menuitems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


