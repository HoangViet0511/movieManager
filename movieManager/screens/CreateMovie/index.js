import React from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import Background from '../../assets/images/background.jpg';
import {Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {useFormik} from 'formik';
import ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';
import ErrorText from '../../components/ErrorText';
import * as _ from 'lodash';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const movieSchema = yup.object().shape({
  tenPhim: yup
    .string()
    .required('*Thông tin bắt buộc nhập')
    .max(50, '*Tên phim không quá 50 kí tự'),
  biDanh: yup
    .string()
    .required('*Thông tin bắt buộc nhập')
    .min(5, '*Bí danh phải trên 5 kí tự'),
  trailer: yup
    .string()
    .required('*Thông tin bắt buộc nhập')
    .url('*Trailer không đúng định dang'),
});

const accessToken = useSelector(state => state.credentials.data.accessToken);

const CreateMovieScreen = props => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    base64: true,
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      biDanh: '',
      trailer: '',
      hinhAnh: '',
      moTa: '',
      maNhom: 'GP01',
      ngayKhoiChieu: new Date(),
      danhGia: 0,
    },
    validationSchema: movieSchema,
    validateOnMount: true,
  });

  const pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //Check ios bỏ 'file://'
        const upLoadUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '')
            : response.uri + response.path;

        //object file sẽ gửi lên cloudinary
        const source = {
          uri: upLoadUri,
          name: 'test.jpg',
          type: 'img/jpg',
        };

        //create formData để gửi file lên sever
        const data = new FormData();
        date.append('file', source);
        data.append('upload_preset', 'hoangviet');

        //call Axios
        Axios({
          method: 'POST',
          url: 'https://api.cloudinary.com/v1_1/dovhjzn7n/image/upload',
          data: data,
        })
          .then(res => {
            formik.setFieldValue('hinhAnh', res.data.uri);
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleSubmit = () => {
    /*console.log(formik.errors);
    console.log(formik.values);
    console.log(formik.touched);*/

    /*if(Object.keys(formik.errors).length !== 0) {
      return;
    }
    console.log(formik.values);*/

    if (!_.isEmpty(formik.errors)) {
      return;
    }
    const body = {...formik.values};
    const releaseDate = new Date(body.ngayKhoiChieu);

    //format lại định dạng ngày khỏi chiếu
    /*body.ngayKhoiChieu = `${releaseDate.getDate()} - ${releaseDate.getMonth() +
      1} - ${releaseDate.getFullYear()}`;*/
      body.ngayKhoiChieu = moment(body.ngayKhoiChieu).format('DD/MM/YYYY');

    Axios({
      method: 'POST',
      url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim',
      data: body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <TextInput
            placeholder="Tên Phim"
            keyboardType="default"
            onChangeText={formik.handleChange('tenPhim')}
            returnKeyType="next"
            onBlur={formik.handleBlur('tenPhim')}
            placeholderTextColor="white"
            autoCapitalize="none"
            style={styles.formControl}
          />
          <ErrorText
            touched={formik.errors.tenPhim}
            error={formik.errors.tenPhim}
          />
          <TextInput
            placeholder="Bí danh"
            onChangeText={formik.handleChange('biDanh')}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor="white"
            onBlur={formik.handleBlur('biDanh')}
            style={styles.formControl}
          />
          <ErrorText
            touched={formik.errors.biDanh}
            error={formik.errors.biDanh}
          />
          <TextInput
            placeholder="Trailer"
            onChangeText={formik.handleChange('trailer')}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor="white"
            onBlur={formik.handleBlur('trailer')}
            style={styles.formControl}
          />
          <ErrorText
            touched={formik.errors.trailer}
            error={formik.errors.trailer}
          />
          <View style={styles.uploadContainer}>
            <Button onPress={pickImage} title="Pick image" type="solid" />
          </View>
          <TextInput
            placeholder="Mô tả"
            keyboardType="default"
            onChangeText={formik.handleChange('moTa')}
            multiline
            blurOnSubmit
            numberOfLines={5}
            autoCapitalize="none"
            placeholderTextColor="white"
            style={styles.formControl}
          />

          <DatePicker
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            date={new Date(formik.values.ngayKhoiChieu)}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderRadius: 5,
                paddingHorizontal: 10,
                marginBottom: 10,
              },
              dateText: {
                color: 'white',
                fontSize: 20,
              },
            }}
            onDateChange={formik.handleChange('ngayKhoiChieu')}
          />

          <TextInput
            onChangeText={formik.handleChange('danhGia')}
            placeholder="Đánh giá"
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={styles.formControl}
          />
          <Button
            onPress={handleSubmit}
            title="Thêm Phim"
            buttonStyle={styles.btn}
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
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
  },
});

export default CreateMovieScreen;
