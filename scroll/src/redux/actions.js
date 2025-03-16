// src/redux/actions.js
export const SET_IS_SPEAKING = 'SET_NEXT_PAGE';

export const setIsSpeaking = (value) => ({
  type: SET_IS_SPEAKING,
  payload: value,
});
