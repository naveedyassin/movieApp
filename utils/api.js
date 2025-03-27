// utils/api.js

const API_KEY = '271c4b7f'; // Replace with your actual OMDb API key

export const fetchMovies = async (searchTerm, page) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};