document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const toggleBtn = question.querySelector('.toggle-btn');

            // Toggle the active class
            answer.classList.toggle('active');

            // Toggle the plus/minus button
            if (toggleBtn.classList.contains('plus')) {
                toggleBtn.classList.remove('plus');
                toggleBtn.classList.add('minus');
                toggleBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#2A2A2A"/>
                        <path d="M7 12H17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `;
            } else {
                toggleBtn.classList.remove('minus');
                toggleBtn.classList.add('plus');
                toggleBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#2A2A2A"/>
                        <path d="M12 7V17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <path d="M7 12H17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `;
            }

            // Close other answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherToggleBtn = otherQuestion.querySelector('.toggle-btn');

                    otherAnswer.classList.remove('active');

                    if (otherToggleBtn.classList.contains('minus')) {
                        otherToggleBtn.classList.remove('minus');
                        otherToggleBtn.classList.add('plus');
                        otherToggleBtn.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#2A2A2A"/>
                                <path d="M12 7V17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <path d="M7 12H17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        `;
                    }
                }
            });
        });
    });

    // Testimonial Carousel Functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    let currentSlideIndex = 0;
    const totalSlides = testimonialSlides.length;

    // Function to update the current slide
    function updateSlides(index) {
        // Remove active class from all slides and dots
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        currentSlideIndex = (index + totalSlides) % totalSlides;
        testimonialSlides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const clickedIndex = parseInt(dot.getAttribute('data-index'));
            updateSlides(clickedIndex);
        });
    });

    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        updateSlides(currentSlideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        updateSlides(currentSlideIndex + 1);
    });

    // Auto-rotate slides every 5 seconds
    setInterval(() => {
        updateSlides(currentSlideIndex + 1);
    }, 5000);
});