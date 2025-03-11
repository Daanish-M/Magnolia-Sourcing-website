const slideArea = document.querySelector("div.slides")
const images = slideArea.querySelectorAll("img")

let currentSlide = 0
let z = 1

slideArea.addEventListener("click", function() {
  currentSlide = currentSlide + 1
  currentSlide = currentSlide % images.length

  z = z + 1

  images[currentSlide].style.zIndex = z

  images.forEach(image => {
    image.classList.remove("displayed")
  })

  images[currentSlide].classList.add("displayed")
})

slideArea.addEventListener("mouseover", function() {
  images.forEach(image => {
    const x = 15 * (Math.floor(Math.random() * 5)) - 30
    const y = 15 * (Math.floor(Math.random() * 5)) - 30

    image.style.transform = `translate(${x}px, ${y}px)`
  })
})

slideArea.addEventListener("mouseout", function() {
  images.forEach(image => {
    image.style.transform = ""
  })
})