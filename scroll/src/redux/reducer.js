// src/redux/reducer.js
import { SET_IS_SPEAKING } from './actions';

const initialState = {
  isSpeaking: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SPEAKING:
      return {
        ...state,
        isSpeaking: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
