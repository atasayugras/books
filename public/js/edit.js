document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('editBookForm');
  if (editForm) {
    // Retrieve initial rating and status from data attributes
    const initialRating = parseInt(editForm.dataset.rating, 10) || 0;
    const initialStatus = editForm.dataset.status || '';

    /* ********** HANDLE RATING ********** */
    const ratingContainer = document.getElementById('ratingContainer');
    if (ratingContainer) {
      const hearts = ratingContainer.querySelectorAll('.heart');
      const ratingValueInput = document.getElementById('ratingValue');
      let selectedValue = initialRating; // Use initialRating as the default selected rating

      // Function to fill hearts based on a specified value
      const updateHearts = (value) => {
        hearts.forEach((heart, index) => {
          heart.classList.toggle('heart-solid', index < value); // Adds fill to hearts up to the specified value
        });
      };

      // Set the initial rating value on page load
      ratingValueInput.value = initialRating;
      updateHearts(initialRating);

      // Add hover effect to visually fill hearts up to the hovered one
      hearts.forEach((heart, index) => {
        heart.addEventListener('mouseover', () => {
          updateHearts(index + 1); // Temporarily fills hearts up to and including the hovered one
        });

        heart.addEventListener('mouseleave', () => {
          updateHearts(selectedValue); // Resets hearts to the last clicked (selected) rating after hovering
        });

        // Store clicked heart’s value and update the rating
        heart.addEventListener('click', () => {
          selectedValue = index + 1; // Updates selected rating based on click
          ratingValueInput.value = selectedValue; // Sets hidden input for form submission
          updateHearts(selectedValue); // Updates hearts to reflect the clicked rating
        });
      });
    }

    /* ********** HANDLE STATUS SELECT ********** */
    const statusSelect = document.querySelector('select[name="status"]');
    if (statusSelect) {
      // Set the initial selected status
      Array.from(statusSelect.options).forEach((option) => {
        if (option.value === initialStatus) {
          option.selected = true;
        }
      });
    }

    /* ********** TRIGGER FORM SUBMISSION ********** */
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        editForm.submit(); // Submits the form when the submit button is clicked
      });
    }
  }
});
