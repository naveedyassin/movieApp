import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieList from './components/MovieList'; // Corrected import path
import MovieDetail from './components/MovieDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MovieList" component={MovieList} options={{ title: 'Movie Search' }} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;