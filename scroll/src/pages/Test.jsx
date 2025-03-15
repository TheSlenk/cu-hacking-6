import React from 'react';
import useSpeechToText from '../components/useSpeechToText';

const Test = () => {
    const { handleSpeak } = useSpeechToText();

    return (
        <div>
            <h1>Test Component</h1>
            <button className='bg-black' onClick={() => handleSpeak("Hello this is a test")}>Speak</button>
        </div>
    );
};

export default Test;