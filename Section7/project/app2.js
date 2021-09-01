const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const entryTextSection = document.getElementById('entry-text');
const userInputs = addMovieModal.querySelectorAll('input');
const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
const confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
const movies = []

let selectedMovieId = 0

function updateUi() {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

function renderNewMovieElement(id, title, imageUrl, rating) {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
}

function deleteMovieHandler(movieId) {
  selectedMovieId = movieId;
  deleteMovieModal.classList.add('visible');
  showBackdrop();
}

function closeMovieDeletionModal() {
  deleteMovieModal.classList.remove('visible');
  closeBackdrop();
}

function deleteSelectedMovie() {
  deleteMovie(selectedMovieId)
}

function deleteMovie(movieId) {
  let movieIndex = 0;
  for(const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUi();
}

function showMovieModal() {
  addMovieModal.classList.add('visible');
  showBackdrop();
}

function closeMovieModal() {
  addMovieModal.classList.remove('visible');
  closeBackdrop();
}

function showBackdrop() {
  backdrop.classList.add('visible');
}

function closeBackdrop() {
  backdrop.classList.remove('visible');
}

function startAddMovieHandler() {
  showMovieModal();
}

function backdropClickHandler() {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
}

function cancelAddMovieHandler() {
  closeMovieModal();
}

function clearMovieInput() {
  for(const userInput of userInputs) {
    userInput.value = '';
  }
}

function confirmAddMovieHandler() {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if(
    titleValue.trim() === '' 
    || imageUrlValue.trim() === ''
    || ratingValue.trim() === ''
    || +ratingValue < 1
    || +ratingValue > 5
  ) {
    alert("Error!");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  clearMovieInput();
  updateUi();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  closeMovieModal();
}

startAddMovieButton.addEventListener('click', startAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);
cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
confirmDeletionButton.addEventListener('click', deleteSelectedMovie);