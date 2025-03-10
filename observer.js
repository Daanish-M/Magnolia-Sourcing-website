const observer = new IntersectionObserver ((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
        }
    })
}, {
    rootMargin: '0px',
    threshold: [0, 0.1, 1]
})

const tags = document.querySelectorAll('section.hero div.slides, section.portfolio, section.process div.part, section.work, section.intro div.intro-content, section.testimonials div.testimonial')

tags.forEach((tag) => {
    observer.observe(tag)
})