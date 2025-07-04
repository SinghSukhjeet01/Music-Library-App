// InstructionScreen.js:  Instructions for the MusicAppV5 example app
// Author: Harjinder Singh
// Last Updated: 18/03/2024
// Notes: This is the final release of the MusicExample based on the app idea I originally presented
//        This component acts as the Instructions screen of the Music Example

// import the basic React component and library
import {Component} from 'react';
// import react-native specific components
import {ActivityIndicator, StyleSheet, View, Button, Text, TouchableOpacity, Image} from 'react-native';
// Defining InstructionsScreen component
export default class InstructionsScreen extends Component
{
    render() {
              // Importing music image from local resources
        const MusicImage = require('../Resources/music.png');
         // Rendering instructions screen
        return (
            <View style={styles.itemStyle}>
                <Image
                    style={styles.imageStyle}
                    source={MusicImage}
                />
                <Text style={styles.textStyle}>
                    Instructions:
                    {'\n'}
                    {'\n'}
                    1. On the Home Screen, you can go to the Search Screen to search for music albums by a keyword.
                    {'\n'}
                    2. On the Home Screen, you can go to the Favourite Music Screen to view all the previously favorited music.
                    {'\n'}
                    3.  On the Search Screen: If you tap (press) on a music item in the searched list, you will be shown details on it on the Music Details Screen.
                    {'\n'}
                    4.On the Search Screen: If you press and hold (longpress) on a music, it will be saved as a favourite, and the Favourites screen will be displayed listing all saved music.
                    {'\n'}
                    5. On the Favourite Musics Screen: If you press and hold (longpress) on a Favourite Music, you can delete it from Favourites.
                    {'\n'}
                </Text>
            </View>
        );
    }
}

// here we define the styles used by our component ...
// ...through the 'create()' method of the StyleSheet component
const styles = StyleSheet.create
({
    itemStyle:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightyellow',
            flexDirection: 'column',
            padding: 10,
            margin: 10,
        },
    textStyle:
        {
            fontSize: 15,
            fontStyle: 'italic',
            textAlign: 'left',
            margin: 10,
        },
    imageStyle:
        {
            width: 300,
            height: 250,
            resizeMode: 'stretch',
        },
});
