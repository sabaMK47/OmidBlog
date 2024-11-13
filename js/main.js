//----------------------------------slider ----------------------------------//
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
        setInterval(nextSlide, 10000); // Change slide every 10 seconds
    }

    // Start the slider
    startSlider();
});

//-------------------------- posts api call ----------------------------------//

$(document).ready(function() {
    const fetchData = () => {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            success: function(data) {
                $.each(data, function(index, item) {
                    if (index < 6) { // Ensure only the first 6 items are used
                        const $div = $('#new' + (index + 1));
                        $div.find('h3').text(item.title); // Set the title in the h3 tag
                        $div.find('p').text(item.body); // Set the body in the p tag
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    };

    fetchData();
});
