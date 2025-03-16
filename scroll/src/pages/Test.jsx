import React from 'react';
import useSpeechToText from '../components/useSpeechToText';
import Interaction from '../components/TimedSpeech';

const testData = [
  {
    "text": "Let's talk about the incredible world of photosynthesis!",
    "time": 0,
    "image": "A vibrant green leaf with sunlight shining on it."
  },
  {
    "text": "Plants use sunlight, water, and carbon dioxide...",
    "time": 5,
    "image": null
  },
  {
    "text": "...to create their own food and release oxygen, the air we breathe.",
    "time": 10,
    "image": "A simplified diagram of the photosynthesis process, showing inputs and outputs."
  },
  {
    "text": "This process happens in tiny organelles called chloroplasts, found in plant cells.",
    "time": 17,
    "image": "Close up of a plant cell with chloroplasts highlighted."
  },
  {
    "text": "Inside, chlorophyll absorbs sunlight, powering the conversion of CO2 and water into sugars.",
    "time": 23,
    "image": null
  },
  {
    "text": "Photosynthesis: the engine of life on Earth!",
    "time": 27,
    "image": null
  }
];
const Test = () => {
    const { handleSpeak } = useSpeechToText();

    return (
        <div>
            <h1>Test Component</h1>
            <button className='bg-black' onClick={() => handleSpeak("Hello this is a test")}>Speak</button>
            <Interaction data={testData}></Interaction>
        </div>
    );
};

export default Test;