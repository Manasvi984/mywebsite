// Script for form submission
const form = document.getElementById('order-form');
const feedbackForm = document.getElementById('feedback-form');
const successMessage = document.getElementById('success-message');
const ratingStars = document.querySelectorAll('.rating-stars span');
const ratingInput = document.getElementById('rating');

// Handle star rating
ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        // Update the hidden input value with the selected rating
        ratingInput.value = star.getAttribute('data-value');
        
        // Update visual appearance of stars
        ratingStars.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
        
        console.log("Rating selected: " + ratingInput.value); // Debug line
    });
});

// Don't prevent the form from submitting naturally to PHP
form.addEventListener('submit', function() {
    // Validate that rating has been selected
    if (!ratingInput.value) {
        alert("Please select a rating before submitting!");
        return false;
    }
    
    // Form will submit naturally to PHP
    console.log("Form submitting with rating: " + ratingInput.value); // Debug line
});

// Reset the form function (if you need it)
function resetForm() {
    form.reset();
    ratingStars.forEach(star => star.classList.remove('selected'));
    ratingInput.value = "";
}