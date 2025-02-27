// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll');

    container.addEventListener('wheel', (event) => {
        event.preventDefault(); // Empêche le défilement vertical par défaut
        container.scrollBy({
            left: event.deltaY * (window.innerWidth / 100),
            behavior: 'smooth'
        });
    });
});