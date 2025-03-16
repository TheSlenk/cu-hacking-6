// src/redux/reducer.js
import { SET_IS_SPEAKING, SET_IS_PAUSED, SET_TOPIC } from './actions';

const initialState = {
    isSpeaking: false,
    isPaused: false,
    topic: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_SPEAKING:
            return {
                ...state,
                isSpeaking: action.payload,
            };
        case SET_IS_PAUSED:
            return {
                ...state,
                isPaused: action.payload,
            };
        case SET_TOPIC:
            return {
                ...state,
                topic: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
