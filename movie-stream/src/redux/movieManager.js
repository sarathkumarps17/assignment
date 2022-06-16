const movieManager = (storedMovies, movies) => {
  let ids = storedMovies.map((movie) => movie.id);
  movies.forEach((movie) => {
    if (!ids.includes(movie.id)) {
      storedMovies.push(movie);
    }
  });
  return storedMovies;
};
export default movieManager;
