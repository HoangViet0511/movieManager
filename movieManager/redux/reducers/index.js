import {combineReducers} from 'redux';
import movies from './movie';
import credentials from './credentials';

const rootReducer = combineReducers({
  //toàn bộ data(state) chứa ở đây
  movies,
  credentials,
});

export default rootReducer;
