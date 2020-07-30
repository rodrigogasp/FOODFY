
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


// PAGINATE 


function paginate(selectedPage, totalPages) {

    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) { 

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }
            pages.push(currentPage)

            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}
const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}



//SEARCH FOR

const search = document.querySelector("div.searchFor")
const search2 = document.querySelector("div.searchFor h2")

if(search2.textContent == "Buscando por : ''") {

search.classList.add("active")

}


console.log(search)
console.log(search2)


