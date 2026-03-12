let StarRating = 0;

const  stars = document.querySelectorAll('.star');
const movieList = document.getElementById('movieList');


stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    StarRating = index + 1;
    updateStars();
  });

  star.addEventListener('mouseover', () => {
    updateStars(index + 1);
  });

  star.addEventListener('mouseout', () => {
    updateStars();
  });

});

function updateStars(rating = StarRating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

function getMovies() {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  return movies;
}

function addMovie(title, year, genre, rating) {
  const movies = getMovies();
  movies.push({ title, year, genre, rating });
  localStorage.setItem('movies', JSON.stringify(movies));
}

function displayMovies() {
  const movies = getMovies();
  movieList.innerHTML = '';
    movies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `${movie.title} (${movie.year}) - ${movie.genre}, Rating: <span style="color: #f59e0b">${'★'.repeat(parseInt(movie.rating))}</span> <button class="delete-btn" data-title="${movie.title}">Delete</button>`;
   li.querySelector('.delete-btn').addEventListener('click', function() {
      const titleToDelete = this.getAttribute('data-title');
      if (confirm(`Are you sure you want to delete "${titleToDelete}"?`)) {
        deleteMovie(titleToDelete);
        displayMovies();
      }
    });
    movieList.appendChild(li);
  }

    );
}

function deleteMovie(title) {
  let movies = getMovies();
  movies = movies.filter(movie => movie.title !== title);
  localStorage.setItem('movies', JSON.stringify(movies));
}

document.getElementById('movieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('movieTitle').value;
    const year = document.getElementById('movieYear').value;
    const genre = document.getElementById('movieGenre').value;
    addMovie(title, year, genre, StarRating);
    displayMovies();
    this.reset();
    StarRating = 0;
    updateStars();
});

displayMovies();



