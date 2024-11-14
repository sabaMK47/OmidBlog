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

//--------------------------------------like button---------------------------------------//

$(document).ready(function() {
    $('.likebtn').click(function() {
        $(this).toggleClass('liked'); 
    });
});

// -----------------------------------other posts pagination------------------------------//

$(document).ready(function () {
    const postsPerPage = 10;
    let currentPage = 1;
    let totalPosts = 0;

    function fetchPosts(page) {
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: 'GET',
            success: function (data) {
                totalPosts = data.length;
                renderPosts(data, page);
                renderPagination(totalPosts, page);
            },
            error: function (error) {
                console.error("Error fetching posts:", error);
            }
        });
    }

    function renderPosts(data, page) {
        const start = (page - 1) * postsPerPage + 6; // Start from the 7th post
        const end = start + postsPerPage;
        const postsToShow = data.slice(start, end);

        $('#postList').empty();
        postsToShow.forEach(post => {
            $('#postList').append(`
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <div class="like">
                    <i class="uil uil-thumbs-up likebtn" ></i>
                    <i class="uil uil-comment-alt"></i>
                    </div>
                </div>
            `);
        });
    }

    function renderPagination(totalPosts, currentPage) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        $('#pagination').empty();

        for (let i = 1; i <= totalPages; i++) {
            $('#pagination').append(`
                <button class="page-link" data-page="${i}">${i}</button>
            `);
        }

        // Highlight the current page
        $('#pagination .page-link').eq(currentPage - 1).addClass('active');

        // Add click event for pagination buttons
        $('.page-link').click(function () {
            const page = $(this).data('page');
            currentPage = page;
            fetchPosts(currentPage);
        });
    }

    // Initial fetch
    fetchPosts(currentPage);
});

//--------------------------------- comment pop up --------------------------------------//

$(document).ready(function() {
    $('.comment-button').click(function() {
        // Find the closest comment box that is a sibling of the clicked button and toggle its visibility
        $(this).next('.comment-box').toggle();
    });

    $('.save-comment').click(function() {
        // Find the closest textarea and get the comment text
        var comment = $(this).siblings('.comment-text').val();
        if (comment) {
            // You can save the comment here (e.g., send it to a server or save it in local storage)
            console.log('Comment saved:', comment); // For demonstration, just log it to the console
            $(this).siblings('.comment-text').val(''); // Clear the textarea
            $(this).parent('.comment-box').hide(); // Hide the comment box
        } else {
            alert('Please write a comment before saving.'); // Alert if the comment is empty
        }
    });
});