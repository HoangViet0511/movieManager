import React, {Component} from 'react';
import {Text, View, WebView} from 'react-native';

export class MovieDetailScreen extends Component {
  render() {
    console.log(this.props.route.params.movieId);
    return (
      <View>
        <Text> Movie detail </Text>
      </View>
    );
  }
}
//1. Lấy được id phim người dùng chọn
//2. call api, lấy thông tin phim (gửi id lên)
//3. lưu trữ thông phim lên store
//4. ở component, lấy thông tin phim từ store xuống,
//hiển thị ra màn hinhf

export default MovieDetailScreen;
