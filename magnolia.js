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


// Accordion functionality and handle resize 

document.addEventListener("DOMContentLoaded", function() {
    const accordionItems = document.querySelectorAll('section#services div.accordion div.accordion-item');

    function setupAccordion() {
        accordionItems.forEach(item => {
            const header = item.querySelector('h3');
            const content = item.querySelector('.accordion-content');

            header.onclick = function() {
                const isExpanded = content.style.maxHeight && content.style.paddingBottom !== '0px';

                accordionItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherHeader = otherItem.querySelector('h3');

                    otherContent.style.maxHeight = '0px';
                    otherContent.style.paddingBottom = '0px';
                    otherHeader.classList.remove('active');
                });

                if (!isExpanded) {
                    content.style.maxHeight = `${content.scrollHeight}px`;
                    content.style.paddingBottom = '48px';
                    header.classList.add('active');
                }
              
            };
        });
    }

    function teardownAccordion() {
        accordionItems.forEach(item => {
            const header = item.querySelector('h3');
            const content = item.querySelector('.accordion-content');

            header.onclick = null;

            content.style.maxHeight = '';
            content.style.paddingBottom = '';
            header.classList.remove('active');
        });
    }

    if (window.innerWidth <= 768) {
        setupAccordion();
    } else {
        teardownAccordion();
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            setupAccordion();
        } else {
            teardownAccordion();
        }
    });
});