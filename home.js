const topHeader = document.querySelector('div.top-header svg')
const bottomHeader = document.querySelector('div.bottom-header svg')

const scroll = function () {
    const pixels = window.scrollY

    if (pixels > 100) {
        topHeader.classList.add('scrolled')
        bottomHeader.classList.add('scrolled')
    } else {
        topHeader.classList.remove('scrolled')
        bottomHeader.classList.remove('scrolled')
    }

    if (window.innerWidth <= 480) {
        topHeader.classList.remove('scrolled')
        bottomHeader.classList.remove('scrolled')
    }
}

scroll()

document.addEventListener('scroll', scroll)

window.addEventListener('resize', scroll)