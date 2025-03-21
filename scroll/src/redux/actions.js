// src/redux/actions.js
export const SET_IS_SPEAKING = 'SET_NEXT_PAGE';
export const SET_IS_PAUSED = 'SET_IS_PAUSED';
export const SET_TOPIC = 'SET_TOPIC';
export const setIsSpeaking = (value) => ({
    type: SET_IS_SPEAKING,
    payload: value,
});

export const setIsPaused = (value) => ({
    type: SET_IS_PAUSED,
    payload: value,
});

export const setTopic = (value) => ({
    type: SET_TOPIC,
    payload: value,
});