import React, { Component } from "react";
import {  Image, StyleSheet, View,  Dimensions } from "react-native";

export default class Photo extends React.Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
          headerTitle: 'Photo'
        }
      };
    
    render() {
        const { params } = this.props.navigation.state;
        const itemURL = params ? params.itemURL : "https://pixabay.com/get/35bbf209e13e39d2_640.jpg";

        return(
            <View style={styles.containerModal}>
                <Image source={{uri: itemURL}} 
                    style={styles.imageLarge} 
                />
            </View>
        ) 
    }

}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: Dimensions.get('window').height*0.07,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center'
    },
    imageLarge:{
        margin: 2,
        padding: 2,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        aspectRatio: 1.0,
        justifyContent: 'center',
    }
});