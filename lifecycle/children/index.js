import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';

export class Chidren extends PureComponent {
  //   componentWillReceiveProps() {
  //     console.log('componentWillReceiveProps');
  //   }

  //   shouldComponentUpdate(nextProps) {
  //     if (
  //       this.props.stateA !== nextProps.stateA ||
  //       this.props.stateB !== nextProps.stateB
  //     ) {
  //       return true;
  //     }
  //     //quyết định component có cần update tiếp hay ko
  //     console.log('shouldComponentUpdate');
  //     return false;
  //   }

  render() {
    console.log('render');
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }

  componentDidUpdate() {
    //sau khi thay đổi thì viết ở đây
    console.log('componentDidUpdate˝');
  }
}

export default Chidren;
