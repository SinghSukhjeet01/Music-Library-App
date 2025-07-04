// Importing necessary components from React and React Native.
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native';
// Defining a class-based component for SearchArtistScreen.
class SearchArtistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', // Input field value for search term
      artists: [],    // Array to store search results
      errorMessage: '', // Error message if there's any error during search
    };
  }
  // Function to handle search for artists.
  handleSearch = () => {
    // Destructuring searchTerm from state.
    const { searchTerm } = this.state;
    //const API_KEY = 'add api key here';
    // URL for artist search endpoint.
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(searchTerm)}&api_key=${API_KEY}&format=json`;
        // Fetching artists from Last.fm API.
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
                // Extracting artists from API response and updating state.
        const artists = data.results.artistmatches.artist;
        this.setState({ artists, errorMessage: '' });
      })
      .catch((error) => {
                // Handling errors during fetch and updating state with error message.
        console.error('Error fetching artists:', error.message);
        this.setState({ artists: [], errorMessage: error.message });
      });
  };
   // Function to handle press on artist item to navigate to its details.
  handleArtistPress = (artist) => {
    const { navigation } = this.props;
    //const API_KEY = 'add api key here';
        // URL for artist details endpoint.
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist.name)}&api_key=${API_KEY}&format=json`;
     // Fetching detailed artist information.
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Extracting artist bio from API response and navigating to ArtistDetail screen with detailed artist object.
        const detailedArtist = {
          ...artist,
          bio: data.artist.bio,
        };
        navigation.navigate('ArtistDetail', { artist: detailedArtist });
      })
      .catch((error) => {
        console.error('Error fetching artist details:', error.message);
      });
  };
  // Function to render each artist item in the FlatList.
  renderArtist = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.artistItem}
        onPress={() => this.handleArtistPress(item)}>
        <Text style={styles.artistName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
   // Rendering method for the component.
  render() {
        // Destructuring errorMessage and artists from state.
    const { errorMessage, artists } = this.state;
    // Rendering the component view.
    return (
      <View style={styles.container}>
              {/* Input field for searching artists */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search for artists"
          onChangeText={(text) => this.setState({ searchTerm: text })}
          value={this.state.searchTerm}
        />
                {/* Button to trigger search */}
        <TouchableOpacity style={styles.searchButton} onPress={this.handleSearch}>
          <Text style={styles.buttonText}>Search Music Artist</Text>
        </TouchableOpacity>
                {/* Displaying error message if there's any error during search */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
                    // Displaying search results as a list of artist items using FlatList
          <FlatList
            data={artists}
            renderItem={this.renderArtist}
            keyExtractor={(item) => item.mbid}
            contentContainerStyle={styles.artistList}
          />
        )}
      </View>
    );
  }
}
// Styles for the SearchArtistScreen component.
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
  artistItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  artistList: {
    flexGrow: 1,
  },
});
// Exporting the SearchArtistScreen component.
export default SearchArtistScreen;
