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
                    <div class="like-comment">
                                <div class="like">
                                    <i class="uil uil-thumbs-up likebtn" ></i>
                                </div>
                                <div class="comment">
                                    <i class="uil uil-comment-alt comment-button"></i>
                                    <div class="comment-box" style="display: none;">
                                        <textarea class="comment-text" placeholder="Write your comment here..."></textarea>
                                        <button class="save-comment">Save Comment</button>
                                    </div>
                                </div>
                            </div>
                </div>  
            `);
        });
    }

    

    // Initial fetch
    fetchPosts(currentPage);
});

//--------------------------------- comment pop up --------------------------------------//

$(document).ready(function() {
    $('.comment-button').click(function() {
        $(this).siblings('.comment-box').toggle();
    });

    $('.save-comment').click(function() {
        var commentBox = $(this).closest('.comment-section');
        var commentText = commentBox.find('.comment-text').val();
        var commentsDisplay = commentBox.find('.comments-display');
        var showCommentsButton = commentBox.find('.show-comments');

        if (commentText) {
            // Save the comment
            var comments = commentsDisplay.data('comments') || [];
            comments.push(commentText);
            commentsDisplay.data('comments', comments);
            console.log('Comment saved:', commentText);
            commentBox.find('.comment-text').val('');
            commentBox.find('.comment-box').hide();
            toggleShowCommentsButton(comments, showCommentsButton);
         } else {
             alert('Please write a comment before saving.');
         }
    });

    $('.show-comments').click(function() {
        var commentBox = $(this).closest('.comment-section');
        var comments = commentBox.find('.comments-display').data('comments') || [];
        displayCommentsInModal(comments, commentBox);
        commentBox.find('.comments-modal').show(); // Show the modal
    });

    $('.close-modal').click(function() {
        $(this).closest('.comments-modal').hide(); // Hide the modal when close button is clicked
    });

    function displayCommentsInModal(comments, commentBox) {
        var commentsDisplay = commentBox.find('.comments-display');
        commentsDisplay.empty();
        comments.forEach(function(comment) {
            commentsDisplay.append('<div class="comment-item">' + comment + '</div>');
        });
    }

    function toggleShowCommentsButton(comments, button) {
        // Show the button only if there is at least one comment
        if (comments.length > 0) {
            button.show(); 
        } else {
            button.hide(); 
        }
    }
});

//------------------------------ header on scroll-----------------------------------------//

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { 
            $('#header').css({
                'background-color': 'rgb(58, 54, 54)',
                'color': 'white'
            });
        } else {
            $('#header').css({
                'background-color': 'rgba(255, 255, 255, 0.349)',
                'color': 'black' 
            });
        }
    });
});

//-------------------------------- menu responsive toggle--------------------------------//

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active'); 
}

