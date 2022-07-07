const splashScreen = document.querySelector(".splash-screen")
const searchEl = document.getElementsByClassName("header__search")

window.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(() => {
    splashScreen.classList.add("hidden")
  }, 2500)
});

searchEl.addEventListener('click', (event) => {
  
})