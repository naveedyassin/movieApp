import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { fetchMovieDetails } from '../utils/api'; // Corrected import path
import { saveFavoriteMovie, getFavoriteMovies, removeFavoriteMovie } from '../utils/storage'; //Corrected import path


const MovieDetail = ({ route }) => {
  const { imdbID } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(imdbID);
        setMovieDetails(details);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [imdbID]);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavoriteMovies();
      if (favorites && movieDetails) {
        setIsFavorite(favorites.some((fav) => fav.imdbID === movieDetails.imdbID));
      }
    };
    checkFavorite();
  }, [movieDetails]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavoriteMovie(movieDetails.imdbID);
      setIsFavorite(false);
    } else {
      await saveFavoriteMovie(movieDetails);
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!movieDetails) {
    return <Text>Movie details not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movieDetails.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movieDetails.Title}</Text>
      <Text>Year: {movieDetails.Year}</Text>
      <Text>Genre: {movieDetails.Genre}</Text>
      <Text>Rating: {movieDetails.imdbRating}</Text>
      <Text>Plot: {movieDetails.Plot}</Text>
      <Button title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} onPress={toggleFavorite} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetail;