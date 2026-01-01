// Fading in sections on scroll
document.addEventListener("DOMContentLoaded", function() {

    const sectionIds = ['about', 'services', 'contact'];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.opacity = '1';
            } else {
                const el = entry.target;
                el.style.opacity = '0';
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.05
    });

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            observer.observe(section);
        }
    });
    
});


// Get the length of the signature SVG path and log it to the console
const path = document.querySelector('header.top div.signature svg path');
const length = path.getTotalLength();

console.log("Path length is:" + length);