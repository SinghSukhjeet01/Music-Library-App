// Importing necessary components and modules from React, React Native, AsyncStorage, and React Navigation.
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// Defining the FavoriteAlbumsScreen functional component.
const FavoriteAlbumsScreen = () => {
    // Initializing navigation using useNavigation hook from React Navigation.
  const navigation = useNavigation();
    // State to manage favorite albums list.
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  // useEffect hook to fetch favorite albums from AsyncStorage when the component mounts.
  useEffect(() => {
    fetchFavoriteAlbums();
  }, []);
  // Function to fetch favorite albums from AsyncStorage.
  const fetchFavoriteAlbums = async () => {
    try {
      const storedFavoriteAlbums = await AsyncStorage.getItem('favoriteAlbums');
      if (storedFavoriteAlbums !== null) {
        setFavoriteAlbums(JSON.parse(storedFavoriteAlbums));
      }
    } catch (error) {
      console.error('Error fetching favorite albums from AsyncStorage:', error);
    }
  };
   // Function to handle press event on album item to navigate to its details.
  const handleAlbumPress = (album) => {
    navigation.navigate('MusicAlbumDetail', { album });
  };
  // Function to handle long press event on album item to delete it from favorites.
  const handleLongPress = async (index) => {
    Alert.alert(
      'Delete Album',
      'Are you sure you want to delete this album from favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteAlbum(index),
          style: 'destructive',
        },
      ]
    );
  };
   // Function to delete album from favorites list.
  const deleteAlbum = async (index) => {
    const updatedFavoriteAlbums = [...favoriteAlbums];
    updatedFavoriteAlbums.splice(index, 1);
    setFavoriteAlbums(updatedFavoriteAlbums);
    try {
      await AsyncStorage.setItem('favoriteAlbums', JSON.stringify(updatedFavoriteAlbums));
    } catch (error) {
      console.error('Error deleting album from favorites:', error);
    }
  };
  // Rendering the component view.
  return (
    <View style={styles.container}>
          {/* FlatList to render list of favorite albums */}
      <FlatList
        data={favoriteAlbums}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleAlbumPress(item)}
            onLongPress={() => handleLongPress(index)}
            style={styles.itemContainer}>
                        {/* Displaying album name */}
            <Text style={styles.albumName}>{item.name}</Text>
                        {/* Displaying artist name */}
            <Text style={styles.artistName}>{item.artist}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
// Styles for the FavoriteAlbumsScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
    color: '#666',
  },
});
// Exporting the FavoriteAlbumsScreen component.
export default FavoriteAlbumsScreen;
