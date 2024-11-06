document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('editBookForm');
  const submitButton = document.getElementById('submitButton'); // Button from partial
  const initialRating = parseInt(editForm.dataset.rating, 10) || 0;
  const initialStatus = editForm.dataset.status || '';

  const ratingContainer = document.getElementById('ratingContainer');
  const hearts = ratingContainer.querySelectorAll('.heart');
  const ratingValueInput = document.getElementById('ratingValue');

  // Function to update the hearts' appearance based on the selected value
  const updateHearts = (value) => {
    hearts.forEach((heart, index) => {
      if (index < value) {
        heart.classList.remove('heart');
        heart.classList.add('heart-solid');
      } else {
        heart.classList.remove('heart-solid');
        heart.classList.add('heart');
      }
    });
  };

  // Set the initial rating visually
  ratingValueInput.value = initialRating;
  updateHearts(initialRating);

  // Make each heart clickable for rating selection
  hearts.forEach((heart) => {
    heart.addEventListener('click', (event) => {
      const value = parseInt(event.target.getAttribute('data-value'), 10);
      ratingValueInput.value = value;
      updateHearts(value);
    });
  });

  // Handle initial status selection
  const statusSelect = document.querySelector('select[name="status"]');
  Array.from(statusSelect.options).forEach((option) => {
    if (option.value === initialStatus) {
      option.selected = true;
    }
  });

  // Form submission trigger - only add event if button exists
  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default if triggering manually
      editForm.submit(); // Manually trigger form submission
    });
  } else {
    console.error("Submit button with ID 'submitButton' not found");
  }
});
