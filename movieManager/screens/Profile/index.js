import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';

export class ProfileScreen extends Component {
  goToSigninScreen = () => {
    this.props.navigation.navigate('signin');
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Icon name="user-circle" size={80} />
          <Button
            buttonStyle={styles.btn}
            title="Đăng nhập"
            onPress={this.goToSigninScreen}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btn: {
    backgroundColor: '#c2422b',
    marginTop: 20,
  },
});

export default ProfileScreen;
