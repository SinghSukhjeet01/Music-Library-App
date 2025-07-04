// Importing necessary components from React, React Native, AsyncStorage, and Toast.
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// Defining a class-based component for SearchAlbumScreen.
class SearchAlbumScreen extends Component {
    // Constructor to initialize state.
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', // Input field value for search term
      albums: [],     // Array to store search results
      errorMessage: '', // Error message if there's any error during search
    };
  }
// Function to handle search for albums.
  handleSearch = () => {
    // Destructuring searchTerm from state.
    const { searchTerm } = this.state;
    // API key for Last.fm API.
    //const API_KEY = 'add api key';
     // URL for album search endpoint.
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=${API_KEY}&format=json`;
     // Fetching albums from Last.fm API.
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        }
        // Extracting albums from API response and updating state.
        const albums = data.results.albummatches.album;
        this.setState({ albums, errorMessage: '' });
      })
      .catch((error) => {
         // Handling errors during fetch and updating state with error message.
        console.error('Error fetching albums:', error.message);
        this.setState({ albums: [], errorMessage: error.message });
      });
  };
// Function to handle press on album item to navigate to its details.
  handleAlbumPress = (album) => {
    const { navigation } = this.props;
    //const API_KEY = 'add api key';
        // URL for album details endpoint.
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(
      album.artist
    )}&album=${encodeURIComponent(album.name)}&api_key=${API_KEY}&format=json`;
    // Fetching detailed album information.
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
         // Extracting album summary from API response and navigating to MusicAlbumDetail screen with detailed album object.
        const detailedAlbum = {
          ...album,
          summary: data.album.wiki ? data.album.wiki.summary : 'Summary not available',
        };
        navigation.navigate('MusicAlbumDetail', { album: detailedAlbum });
      })
      .catch((error) => {
        console.error('Error fetching album details:', error.message);
      });
  };
  // Function to add album to favorites.
  addToFavorites = async (album) => {
    try {
          // Retrieving existing favorite albums from AsyncStorage.
      const existingFavorites = await AsyncStorage.getItem('favoriteAlbums');
          // Parsing existing favorites or initializing an empty array if there are no existing favorites.
      let favoriteAlbums = existingFavorites ? JSON.parse(existingFavorites) : [];
          // Checking if the album is already in favorites.
      const isAlbumInFavorites = favoriteAlbums.some(
        (favAlbum) => favAlbum.name === album.name && favAlbum.artist === album.artist
      );
           // If the album is not in favorites, add it to favorites and update AsyncStorage.

      if (!isAlbumInFavorites) {
        favoriteAlbums.push(album);
        await AsyncStorage.setItem('favoriteAlbums', JSON.stringify(favoriteAlbums));
           // Displaying a success message using Toast.
        Toast.show({
          type: 'success',
          text1: 'Album Added to Favorites',
          visibilityTime: 2000,
        });
      } else {
            // If the album is already in favorites, display an info message using Toast.
        Toast.show({
          type: 'info',
          text1: 'Album Already in Favorites',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
        // Handling errors during adding album to favorites and displaying an error message using Toast.

      console.error('Error adding album to favorites:', error);
      Toast.show({
        type: 'error',
        text1: 'Error Adding Album to Favorites',
        visibilityTime: 2000,
      });
    }
  };
    // Function to render each album item in the FlatList.
  renderAlbum = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.albumItem}
        onPress={() => this.handleAlbumPress(item)}
        onLongPress={() => this.addToFavorites(item)}>
        <Text style={styles.albumTitle}>{item.name}</Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
      </TouchableOpacity>
    );
  };
   // Rendering method for the component.
  render() {
        // Destructuring errorMessage and albums from state.
    const { errorMessage, albums } = this.state;
      // Rendering the component view.
    return (
      <View style={styles.container}>
       {/* Input field for searching albums */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search for albums"
          onChangeText={(text) => this.setState({ searchTerm: text })}
          value={this.state.searchTerm}
        />
                {/* Button to trigger search */}
        <TouchableOpacity style={styles.searchButton} onPress={this.handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {/* Displaying error message if there's any error during search */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
                    // Displaying search results as a list of album items using FlatList
          <FlatList
            data={albums}
            renderItem={this.renderAlbum}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.albumList}
          />
        )}
                {/* Toast component to display messages */}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    );
  }
}
// Styles for the SearchAlbumScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  albumItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumArtist: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
// Exporting the SearchAlbumScreen component.
export default SearchAlbumScreen;
