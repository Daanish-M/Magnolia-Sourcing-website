const headings = document.querySelectorAll('h1.interactive')

headings.forEach(heading => {
    heading.innerHTML = heading.innerHTML
    .split('')
    .map((letter) => {
        return `<span>${letter}</span>`
    })
    .join('')

    const spans = heading.querySelectorAll('span')

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event

        spans.forEach((span) => {
            const x = (span.getBoundingClientRect().left) + (span.clientWidth / 2)
            const y = (span.getBoundingClientRect().top) + (span.clientHeight / 2)

            const distance = Math.sqrt((clientX - x) * (clientX - x) + (clientY - y) * (clientY - y))

            const normalisedDistance = distance / 95

            const blur = 3 - 1 * normalisedDistance

            span.style.filter = `blur(${blur}px)`
        })
    })
})