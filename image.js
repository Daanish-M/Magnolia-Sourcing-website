// grabbing the parent elements, the global elements
const nav = document.querySelector('nav');
const about = document.querySelector('div.about');

// grabbing the elements in a for each loop

document.querySelectorAll('div.image').forEach(container => {
    const image = container.querySelector('img.tilt-image');

    //adding the interaction that will happen on mousemove for container element

    container.addEventListener('mousemove', (e) => {

        //defining the bounds of the container 
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        //defining the offset for the image
        const offsetX = (x / rect.width) - 0.5;
        const offsetY = (y / rect.height) - 0.5;

        //defining the tilt for the image's movement
        const rotateX = offsetY * -10;
        const rotateY = offsetX * 10;

        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        image.style.boxShadow = `0 30px 60px rgba(0, 0, 0, 0.1)`;
        
        const room = document.querySelectorAll('section.image-room').forEach(room => {
            room.style.backgroundColor = 'rgba(239, 239, 241, 0.5)';
        });
        nav.style.opacity = '0.2';
        about.style.opacity = '0.2';
    });

    //setting the interaction back to default when mouse is not on container

    container.addEventListener('mouseleave', () => {
        image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        image.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';

        const room = document.querySelectorAll('section.image-room').forEach(room => {
            room.style.backgroundColor = 'rgba(239, 239, 241, 1)';
        });
        nav.style.opacity = '1';
        about.style.opacity = '1';
    });
});