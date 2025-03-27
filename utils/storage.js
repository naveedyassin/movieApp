// utils/storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_MOVIES_KEY = 'favoriteMovies';

export const saveFavoriteMovie = async (movie) => {
  try {
    const favorites = await getFavoriteMovies();
    const updatedFavorites = favorites ? [...favorites, movie] : [movie];
    await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error saving favorite movie:', error);
  }
};

export const getFavoriteMovies = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_MOVIES_KEY);
    return favorites ? JSON.parse(favorites) : null;
  } catch (error) {
    console.error('Error getting favorite movies:', error);
    return null;
  }
};

export const removeFavoriteMovie = async (imdbID) => {
  try {
    const favorites = await getFavoriteMovies();
    if (favorites) {
      const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
      await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error removing favorite movie:', error);
  }
};