// screens/HomeScreen.js
// Importing necessary components from React and React Native.
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Defining a class-based component for HomeScreen.
class HomeScreen extends Component {
    // Rendering method for the component.
  render() {
        // Destructuring navigation object from props to enable navigation between screens.
    const { navigation } = this.props;
    // Rendering the component view.
    return (
      <View style={styles.container}>
       {/* Header for the home screen */}
        <Text style={styles.header}>The Music Search App</Text>
        {/* Container for buttons */}
        <View style={styles.buttonContainer}>
                  {/* Button to navigate to SearchAlbum screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SearchAlbum')}>
            <Text style={styles.buttonText}>Search Albums</Text>
          </TouchableOpacity>
                    {/* Button to navigate to FavoriteAlbums screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FavoriteAlbums')}>
            <Text style={styles.buttonText}>Favourite Albums</Text>
          </TouchableOpacity>
                    {/* Button to navigate to SearchArtist screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SearchArtist')}>
            <Text style={styles.buttonText}>Search Artist</Text>
          </TouchableOpacity>
                    {/* Button to navigate to Instructions screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('InstructionsScreen')}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle} >
                    Created by: Sukhjeet Singh (2024)
                </Text>
        </View>
      </View>
    );
  }
}

// Styles for the HomeScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
        fontSize: 16,
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        color: 255,
        textAlign: 'centre',
    },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
// Exporting the HomeScreen component.
export default HomeScreen;
