import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

export default class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    var page = this.state.page;
    var url =
      "https://pixabay.com/api/?key=12685050-e7563d842491272afc0180919&q=city&page=" +
      page +
      "&per_page=8";
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.hits],
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text>Загрузка...</Text>
      </View>
    );
  };

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: 'Photo Gallery'
    }
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.flatlist}
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate("Photo", {
                  itemURL: item.largeImageURL
                });
              }}
            >
              <Image
                style={styles.imagewrap}
                source={{ uri: item.webformatURL }}
              />
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter()}
          numColumns={2}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "white",
    alignItems: "center"
  },
  flatlist: {
    backgroundColor: "white"
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get("window").height / 3 - 12,
    width: Dimensions.get("window").width / 2 - 4,
    backgroundColor: "white"
  }
});
