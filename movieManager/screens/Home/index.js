import React, {Component} from 'react';
import {View, FlatList, Platform, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {fetchMovies} from '../../redux/actions';

import {connect} from 'react-redux';

import MovieItem from '../../components/MovieItem/index';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Connect store lấy danh sách phim xuống
// dùng flatlist để render giao diện

export class HomeScreen extends Component {
  goToCreateMovieScreen = () => {
    this.props.navigation.navigate('createMovie');
  };

  render() {
    return (
      <SafeAreaView>
        <View style={{paddingHorizontal: 15, paddingVertical: 30}}>
          <View style={styles.addBtnContainer}>
            <Button
              buttonStyle={styles.addBtn}
              icon={() => (
                <Icon
                  name="add"
                  size={30}
                  color="white"
                  onPress={this.goToCreateMovieScreen}
                />
              )}
            />
          </View>
          <FlatList
            numColumns="1"
            data={this.props.movieList}
            keyExtractor={(item) => item.maPhim}
            renderItem={(item) => <MovieItem movie={item.item} />}
          />
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies());
  }
}

const styles = StyleSheet.create({
  addBtnContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addBtn: {
    padding: 20,
    backgroundColor: '#c2422b',
  },
});

const mapStateToProps = (state) => {
  return {
    movieList: state.movies,
  };
};

export default connect(mapStateToProps)(HomeScreen);
