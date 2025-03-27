import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          onChangeText={onSearch}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default SearchBar;


