import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from '@react-navigation/compat';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const MovieItem = (props) => {
  const credentials = useSelector((state) => state.credentials.data);

  const goToDetail = () => {
    props.navigation.navigate('detail', {
      movieId: props.movie.maPhim,
    });
  };

  const deleteMovie = () => {
    //gọi axios xoá phim
    Axios({
      method: 'DELETE',
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${props.movie.maPhim}`,
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({...err});
      });
  };

  const {movie} = props;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: movie.hinhAnh,
        }}
        style={styles.image}
      />
      <View style={styles.rating}>
        <Text style={styles.ratingScore}>{movie.danhGia}</Text>
        <View style={styles.ratingStars}>
          <Icon name="star" size={15} style={styles.starIcon} />
          <Icon name="star" size={15} style={styles.starIcon} />
          <Icon name="star" size={15} style={styles.starIcon} />
          <Icon name="star" size={15} style={styles.starIcon} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{movie.tenPhim}</Text>
        {/* <Button
      buttonStyle={Platform.select({
        ios: styles.btnIOS,
        android: styles.btnAndroid,
      })}
      title="ĐẶT VÉ"
      onPress={goToDetail}
    /> */}
        <View>
          <Button
            buttonStyle={styles.btnIOS}
            title="CHI TIẾT"
            onPress={goToDetail}
          />
          <Button
            buttonStyle={styles.btnIOS}
            title="XOÁ"
            onPress={deleteMovie}
          />
        </View>
      </View>
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.overlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },

  container: {
    borderRadius: 15,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 400,
  },
  rating: {
    backgroundColor: 'rgba(109,108,104,0.9)',
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  ratingScore: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500',
  },
  ratingStars: {
    flexDirection: 'row',
  },
  starIcon: {
    color: '#c2422b',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  name: {
    color: 'white',
    fontSize: 35,
    fontWeight: '500',
    marginRight: 40,
    flexShrink: 1,
  },
  btnIOS: {
    backgroundColor: '#c2422b',
    marginBottom: 10,
  },
  btnAndroid: {
    backgroundColor: 'green',
  },
});

export default withNavigation(MovieItem);
