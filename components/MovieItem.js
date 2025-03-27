import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieItem = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.Title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10, // Added padding and comma
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
});

export default MovieItem;