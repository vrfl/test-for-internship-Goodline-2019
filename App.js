import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import PhotoGallery from "./screens/PhotoGallery";
import Photo from "./screens/Photo";

const MainStack = createStackNavigator(
  {
    PhotoGallery: {
      screen: PhotoGallery
    },
    Photo: {
      screen: Photo
    }
  },
  {
    initialRouteName: "PhotoGallery",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2F4F4F"
      },
      headerTintColor: "#D3D3D3",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
