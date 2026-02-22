const carousel = document.getElementById('carousel');
const cards = [...carousel.children];
let isDown = false;
let startX;
let scrollLeft;

// Create 3 sets: [clones] [originals] [clones]
cards.forEach(card => carousel.appendChild(card.cloneNode(true)));
cards.forEach(card => carousel.appendChild(card.cloneNode(true)));

// Start scrolled to the middle set (the originals)
const singleSetWidth = carousel.scrollWidth / 3 - 50;
carousel.scrollLeft = singleSetWidth;

// Silently reset when reaching a clone boundary
carousel.addEventListener('scroll', () => {
    const setWidth = carousel.scrollWidth / 3;
    if (carousel.scrollLeft >= setWidth * 2) {
        carousel.scrollLeft -= setWidth;
    } else if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft += setWidth;
    }
});

// Arrow button scrolling
const scrollAmount = 270; // card width + gap
document.getElementById('scroll-left').addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
document.getElementById('scroll-right').addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('cursor-grabbing');
    carousel.classList.remove('cursor-grab');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('cursor-grabbing');
    carousel.classList.add('cursor-grab');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('cursor-grabbing');
    carousel.classList.add('cursor-grab');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});