$(document).ready(function() {
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active'); // Remove active class from all slides
        slides.eq(index).addClass('active'); // Add active class to the current slide
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide
        showSlide(currentIndex);
    }

    function startSlider() {
        // Auto slide every 3 seconds
        setInterval(nextSlide, 10000); // Change slide every 5 seconds
    }

    // Start the slider
    startSlider();
});