import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
// Define a class component called MusicAlbumDetailScreen
class MusicAlbumDetailScreen extends Component {
    // Define a method shareAlbum asynchronously
  shareAlbum = async () => {
        // Extract the album object from props.route.params
    const { album } = this.props.route.params;

    try {
            // Share the album details
      const result = await Share.share({
        message: `Check out this album: ${album.name} - ${album.artist}. Link: ${album.url}`,
        url: album.image[2]['#text'],
      });
      // Handle different outcomes of sharing
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  // Define a render method
  render() {
    const { album } = this.props.route.params;
// Render the component
    return (
      <View style={styles.container}>
        <Image source={{ uri: album.image[2]['#text'] }} style={styles.albumImage} />
        <View style={styles.summaryContainer}>
          <Text style={styles.albumSummary}>{album.summary}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={this.shareAlbum}>
          <Text style={styles.shareButtonText}>Share Album</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  albumImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: '#B8E3FC', // Background color for text
    padding: 10,
    borderRadius: 5,
  },
  albumSummary: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000000',
    lineHeight: 24,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
// Export the MusicAlbumDetailScreen
export default MusicAlbumDetailScreen;
