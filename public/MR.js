let StarRating = 0;

const  stars = document.querySelectorAll('.star');
const movieList = document.querySelector('.movie-list');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating=parse
