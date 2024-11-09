document.addEventListener('DOMContentLoaded', () => {
  /* ********** TRIGGER FORM ********** */
  // Submits the addBookForm when the submit button is clicked
  const submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      document.getElementById("addBookForm").submit();
    });
  }

  /* ********** ISBN INPUT ONLY NUMBER ********** */
  // Restricts ISBN input to only numbers
  const isbnInput = document.getElementById('isbnInput');
  if (isbnInput) {
    isbnInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, ''); // Removes non-numeric characters
    });
  }

  /* ********** HANDLE RATING ********** */
  const ratingContainer = document.getElementById('ratingContainer');
  if (ratingContainer) {
    const hearts = ratingContainer.querySelectorAll('.heart');
    const ratingValueInput = document.getElementById('ratingValue');
    let selectedValue = 0; // Tracks the selected rating on click

    // Fills the hearts based on the given value
    const updateHearts = (value) => {
      hearts.forEach((heart, index) => {
        heart.classList.toggle('heart-solid', index < value); // Adds or removes the fill class based on index
      });
    };

    // Adds hover effect to visually fill hearts up to the hovered one
    hearts.forEach((heart, index) => {
      heart.addEventListener('mouseover', () => {
        updateHearts(index + 1); // Fills hearts up to and including the hovered one
      });

      heart.addEventListener('mouseleave', () => {
        updateHearts(selectedValue); // Resets to the clicked rating after hover ends
      });

      // Stores the value of the clicked heart, updates fill, and sets rating input
      heart.addEventListener('click', () => {
        selectedValue = index + 1; // Updates selected rating based on click
        updateHearts(selectedValue); // Updates hearts to reflect the clicked rating
        ratingValueInput.value = selectedValue; // Sets the hidden input value for form submission
      });
    });
  }
});
