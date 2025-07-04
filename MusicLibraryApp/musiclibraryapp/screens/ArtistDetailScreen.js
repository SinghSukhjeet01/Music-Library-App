// ArtistDetailScreen.js
// Importing necessary components from React and React Native.

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Defining a class-based component for ArtistDetailScreen.
class ArtistDetailScreen extends Component {
    // Rendering method for the component.
  render() {
        // Destructuring the 'route' object from props to access route parameters.
    const { route } = this.props;
        // Destructuring 'artist' object from route parameters.
    const { artist } = route.params;
    // Rendering the component view.
    return (
      <View style={styles.container}>
              {/* Displaying the artist's name */}
        <Text style={styles.artistName}>{artist.name}</Text>
                {/* Displaying the artist's summary if available, otherwise showing 'Summary not available' */}
        <Text style={styles.artistSummary}>{artist.bio ? artist.bio.summary : 'Summary not available'}</Text>
      </View>
    );
  }
}
// Styles for the component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artistSummary: {
    textAlign: 'center',
  },
});
// Exporting the ArtistDetailScreen component.
export default ArtistDetailScreen;
