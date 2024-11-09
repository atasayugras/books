  /* ********** TRIGGER FORM ********** */
  document.getElementById("submitButton").addEventListener("click", () => {
    document.getElementById("addBookForm").submit();
  });

  /* ********** ISBN INPUT ONLY NUMBER ********** */
  document.getElementById('isbnInput').addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, ''); // Removes any non-numeric characters
});


  /* ********** HANDLE RATING ********** */
document.addEventListener('DOMContentLoaded', () => {
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

  // Add click event to each heart
  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      const value = parseInt(heart.getAttribute('data-value'));
      ratingValueInput.value = value; // Set the hidden input's value
      updateHearts(value); // Update the hearts' appearance
    });
  });
});