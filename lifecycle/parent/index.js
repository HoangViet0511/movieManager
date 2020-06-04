import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Children from '../children';

export class Parent extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      a: 1,
      b: 1,
    };
  }

  //   componentWillMount() {
  //     console.log('componentWillMount');
  //   }

  render() {
    return (
      <View>
        <Button
          title="change A"
          onPress={() => {
            this.setState({a: this.state.a + 1});
          }}
        />
        <Button
          title="change B"
          onPress={() => {
            this.setState({b: this.state.b + 1});
          }}
        />

        <Children stateA={this.state.a} stateB={this.state.b} />
      </View>
    );
  }

  componentDidMount() {
    // code chạy lần đầu tiên
    console.log('componentDidMount');
  }
}

export default Parent;
