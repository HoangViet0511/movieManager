import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  Image,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.jpg';
import {Button} from 'react-native-elements';
import Axios from 'axios';

const SigninScreen = (props) => {
  //useState hook
  const [account, setAccount] = useState({
    taiKhoan: '',
    matKhau: '',
  });

  const handleChange = (property) => (val) => {
    setAccount({...account, [property]: val});
  };

  const handleSubmit = () => {
    console.log(account);
    Axios({
      url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
      method: 'POST',
      //request body: chứa dữ liệu muốn gửi kèm theo request
      data: account,
    })
      .then((res) => {
        AsyncStorage.setItem('credentials', JSON.stringify(res.data));
        props.navigation.replace('home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.content}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.form}>
          <TextInput
            placeholder="Tài khoản"
            keyboardType="default"
            returnKeyType="next"
            placeholderTextColor="white"
            autoCapitalize="none"
            onChangeText={handleChange('taiKhoan')}
            style={styles.formControl}
          />
          <TextInput
            placeholder="Mật khẩu"
            keyboardType="default"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={handleChange('matKhau')}
            style={styles.formControl}
          />
          <Button
            title="Đăng nhập"
            buttonStyle={styles.btn}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 300,
  },
  form: {
    width: '100%',
  },
  formControl: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 20,
    color: 'white',
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default SigninScreen;
