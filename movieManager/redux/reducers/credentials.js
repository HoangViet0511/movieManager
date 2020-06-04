import {SET_CREDENTIALS} from '../actions/type';

let initialState = {
  data: null,
  isLogin: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_CREDENTIALS: {
      if (payload) {
        state.data = JSON.parse(payload);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
      return {...state};
    }
    default:
      return state;
  }
};
