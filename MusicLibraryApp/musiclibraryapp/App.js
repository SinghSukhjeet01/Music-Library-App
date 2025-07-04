// App.js
// Importing necessary screens and screens from React Navigation and custom screens.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchAlbumScreen from './screens/SearchAlbumScreen';
import MusicAlbumDetailScreen from './screens/MusicAlbumDetailScreen';
import FavoriteAlbumScreen from './screens/FavoriteAlbumsScreen';
import SearchArtistScreen from './screens/SearchArtistScreen';
import ArtistDetailScreen from './screens/ArtistDetailScreen';
import InstructionsScreen from './screens/InstructionsScreen';
// Creating a stack navigator using createStackNavigator from React Navigation.
const Stack = createStackNavigator();
// Defining the main App component.
const App = () => {
  return (
    // Wrapping the entire navigation inside NavigationContainer for navigation functionality.
    <NavigationContainer>
      {/* Defining different screens and their configurations within the stack navigator */}
      {/* Setting initialRouteName as Home */}
      <Stack.Navigator initialRouteName="Home">
        {/* Each Stack.Screen represents a different screen in the app */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Screen' }}
        />
        {/* Home screen with a title 'Home Screen' */}
        <Stack.Screen
          name="SearchAlbum"
          component={SearchAlbumScreen}
          options={{ title: 'Music Albums Search Screen' }}
        />
        <Stack.Screen
          name="MusicAlbumDetail"
          component={MusicAlbumDetailScreen}
          options={{ title: 'Music Album Detail Screen' }}
        />
        <Stack.Screen
          name="SearchArtist"
          component={SearchArtistScreen}
          options={{ title: 'Music Artist Search Screen' }}
        />
        <Stack.Screen
          name="FavoriteAlbums"
          component={FavoriteAlbumScreen}
          options={{ title: 'Favourite Music Albums' }}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={ArtistDetailScreen}
          options={{ title: 'Artist Detail Screen' }}
        />
        <Stack.Screen
          name="InstructionsScreen"
          component={InstructionsScreen}
          options={{ title: 'Instructions Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Exporting the main App component.
export default App;
