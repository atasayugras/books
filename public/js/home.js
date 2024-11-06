document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('bookSearch');
    const ratingFilter = document.getElementById('ratingFilter');
    const bookItems = document.querySelectorAll('.book-item');
    const emptyState = document.querySelector('.empty-state');
  
    function updateEmptyState() {
      const visibleBooks = Array.from(bookItems).filter(book => book.style.display !== 'none');
      if (emptyState) {
        emptyState.style.display = visibleBooks.length === 0 ? 'block' : 'none';
      }
    }
  
    // Filter by search input
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      bookItems.forEach(bookItem => {
        const bookTitle = bookItem.querySelector('.book-title').textContent.toLowerCase();
        bookItem.style.display = bookTitle.includes(filter) ? 'flex' : 'none';
      });
      updateEmptyState();
    });
  
    // Filter by rating
    ratingFilter.addEventListener('change', () => {
      const selectedRating = ratingFilter.value;
      bookItems.forEach(bookItem => {
        const bookRating = bookItem.querySelectorAll('.heart-solid').length;
        bookItem.style.display = (selectedRating === 'all' || parseInt(selectedRating) === bookRating) ? 'flex' : 'none';
      });
      updateEmptyState();
    });
  
    // Initial check for empty state on page load
    updateEmptyState();
  });
  