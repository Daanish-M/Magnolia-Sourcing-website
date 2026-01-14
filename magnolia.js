// Fading in sections on scroll
document.addEventListener("DOMContentLoaded", function() {

    const sectionIds = ['about', 'services', 'work', 'contact'];

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


// Lock and unlock body scroll functions for modal

function lockBodyScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
}


// Fetch JSON data and populate the work gallery div + modal functionality

document.addEventListener("DOMContentLoaded", () => {
    let projects = [];
    let currentIndex = 0;
    
    // Fetch JSON data and populate the work gallery div
    fetch('data/projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        return response.json();
    })
    .then(data => {
        projects = data;

        const gallery = document.querySelector('section#work div.work-gallery');
        gallery.innerHTML = '';

        data.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <a href="${project.file}" data-index="${index}">
                    <img src="images/${project.image}" alt="${project.title}">
                    <div class="card-footer">
                        <h3>${project.title}</h3>
                        <span class="view">VIEW ›</span>
                    </div>
                </a>
            `;
            gallery.appendChild(card);
        });
        
        // Adding event listeners to project cards after they appear
        const cardLinks = document.querySelectorAll('.project-card a');

        cardLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = parseInt(link.dataset.index);
                loadProject(currentIndex);
            });
        });
    })
    .catch(error => {
        console.error('Error loading projects:', error);
    });

    // Function to load any project by index into the modal
    function loadProject(index) {
        if (index < 0 || index >= projects.length) return;

        const project = projects[index];
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const counter = document.getElementById('slide-counter');

        modalTitle.textContent = project.title;
        counter.textContent = `${index + 1} / ${projects.length}`;

        fetch(project.file)
        .then(res => res.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            modalBody.innerHTML = doc.body.innerHTML;
            modal.style.display = 'block';
            lockBodyScroll();
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            modalBody.innerHTML = '<p>Error loading project details.</p>';
            modal.style.display = 'block';
        });

        // Update navigation button states
        document.getElementById('prev-project').classList.toggle('disabled', index === 0);
        document.getElementById('next-project').classList.toggle('disabled', index === projects.length - 1);
    }

    // Modal navigation functionality
    document.getElementById('prev-project').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            loadProject(currentIndex);
        }
    });

    document.getElementById('next-project').addEventListener('click', () => {
        if (currentIndex < projects.length - 1) {
            currentIndex++;
            loadProject(currentIndex);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (document.getElementById('project-modal').style.display === 'block') {
            if (e.key === 'ArrowLeft') document.getElementById('prev-project').click();
            if (e.key === 'ArrowRight') document.getElementById('next-project').click();
            if (e.key === 'Escape') document.getElementById('modal-close').click();
        }
    });


    // Modal close functionality

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            unlockBodyScroll();
        });
    }
});
