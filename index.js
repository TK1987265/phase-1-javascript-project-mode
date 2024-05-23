document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    const movieDetails = document.getElementById('movie-details');
    const searchInput = document.getElementById('search-input');
    const darkModeButton = document.getElementById('dark-mode-button');
  
    // Fetch movie data from SWAPI and populate movie list
    fetch('https://swapi.dev/api/films/')
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
  
        // Use map to transform movie data
        const movieItems = movies.map(movie => {
          const listItem = document.createElement('li');
          listItem.textContent = movie.title;
          listItem.addEventListener('click', () => showMovieDetails(movie));
          return listItem;
        });
  
        // Append transformed movie items to movie list
        movieItems.forEach(item => {
          movieList.appendChild(item);
        });
      })
      .catch(error => console.error('Error fetching movie data:', error));
  
    // Show movie details when a movie title is clicked
    function showMovieDetails(movie) {
      movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Opening Crawl:</strong> ${movie.opening_crawl}</p>
      `;
      movieDetails.classList.remove('hidden');
    }
  
    // Event listener for search input
    searchInput.addEventListener('input', function () {
      const searchTerm = searchInput.value.toLowerCase();
      const movieItems = Array.from(movieList.children);
  
      movieItems.forEach(item => {
        const title = item.textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  
    // Event listener for dark mode button
    darkModeButton.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
    });
  });
  