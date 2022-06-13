
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let details = []
let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
    const isVisible = 
    user.name.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://jsonplaceholder.typicode.com/users") 
 .then(res => res.json())
 .then(data => {
     users = data.map(user => {
         const card = userCardTemplate.content.cloneNode(true).children[0]
         const header = card.querySelector("[data-header]")
         const body = card.querySelector("[data-body]")
         header.textContent = user.name
         body.textContent = user.email
         userCardContainer.append(card)
         return { name: user.name, email: user.email, element: card }
     })
 })



document.addEventListener(`click`, e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]")!= null) return
    
    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdown.classList.toggle("active")
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("active")
    })
})