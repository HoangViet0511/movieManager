import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SigninScreen from '../screens/Signin';
import MovieDetailScreen from '../screens/MovieDetail';
import CreateMovieScreen from '../screens/CreateMovie';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AsyncStorage} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createAction} from '../redux/actions';
import {SET_CREDENTIALS} from '../redux/actions/type';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
      }}>
      <Tab.Screen
        name="movies"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="movie" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MovieAppContainer = () => {
  const dispatch = useDispatch();

  //lấy dữ liệu credentials từ store xuống để kiểm tra
  const isLogin = useSelector((state) => state.credentials.isLogin);

  //componentDidMount, componentDidUpdate , componentWillUnmount
  useEffect(() => {
    AsyncStorage.getItem('credentials').then((val) => {
      //dispatch 1 action để sửa lại credentials trên
      //store
      dispatch(createAction(SET_CREDENTIALS, val));
    });
  }, [dispatch]);

  if (isLogin === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin && (
          <Stack.Screen
            name="signin"
            component={SigninScreen}
            options={{headerShown: false}}
          />
        )}

        <Stack.Screen
          name="home"
          component={BottomTabBar}
          options={{headerShown: false}}
        />
        <Stack.Screen name="detail" component={MovieDetailScreen} />
        <Stack.Screen
          name="createMovie"
          component={CreateMovieScreen}
          options={{headerTitle: 'Create New Movie'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MovieAppContainer;
