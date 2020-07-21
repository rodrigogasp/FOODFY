
const description = document.getElementsByClassName('recipe-description')

for (let i = 0; i < description.length; i++) {
    const span = description[i].querySelector('.span')
    const content = description[i].querySelector('.content')

    span.addEventListener('click', function() {
        if (span.querySelector('span').innerHTML === 'Esconder') {
            content.classList.add('hide')
            span.querySelector('span').innerText = 'Mostrar'
        } else {
            content.classList.remove('hide')
            span.querySelector('span').innerText = 'Esconder'
        }
    })
} 


// CREATE

const currentPage = location.pathname

const menuitems = document.querySelectorAll(".menu a")



for (item of menuitems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


