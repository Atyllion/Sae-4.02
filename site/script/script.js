// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll');

    container.addEventListener('wheel', (event) => {
        event.preventDefault(); // Empêche le défilement vertical par défaut
        container.scrollBy({
            left: event.deltaY * 2,
            behavior: 'smooth'
        });
    });
});


gsap.registerPlugin(ScrollTrigger);

    gsap.to('.find-text', {
        scrollTrigger: {
            trigger: '.apple',
            start: 'top 50%',
            end: '+=300',
            onEnter: () => {
                // Désactivez le défilement lorsque l'animation commence
                container.style.overflow = 'hidden';
            },
            onLeaveBack: () => {
                // Réactivez le défilement lorsque l'animation est terminée
                container.style.overflow = '';
            },
            onLeave: () => {
                // Réactivez le défilement lorsque l'animation est terminée
                container.style.overflow = '';
            }
        },
        opacity: 1,
        duration: 10,
    });
