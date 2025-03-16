import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useSpeechToText from "./useSpeechToText";

const TimedSpeech = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dispatch = useDispatch();
  const { handleSpeak } = useSpeechToText();

  // Function to start the speech process
  const startSpeaking = async () => {
    setIsSpeaking(true);
    setCurrentIndex(0); // Start from the first index
    dispatch({ type: "SET_IS_SPEAKING", payload: true });
    await speakSequence(); // Start the speaking sequence
  };

  // Function to handle the speaking sequence manually
  const speakSequence = async () => {
    for (let index = currentIndex; index < data.length; index++) {
      const currentText = data[index].text;
      console.log("Speaking:", currentText);
      handleSpeak(currentText); // Speak the text
      const previousTime = data[index - 1]?.time || 0;
      const delay = (data[index].time - previousTime) * 1000 || 2200; // Calculate delay between speeches

      // Wait for the delay before proceeding to the next item
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Update the state to move to the next text
      setCurrentIndex(index + 1);
    }

    // Once done, update the state to indicate speaking is finished
    setIsSpeaking(false);
    dispatch({ type: "SET_IS_SPEAKING", payload: false });
  };

  // Start speaking automatically when the component mounts
  useEffect(() => {
    if (data.length > 0) {
      startSpeaking();
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
      {isSpeaking && <p className="text-lg font-semibold mb-4">{data[currentIndex]?.text}</p>}
    </div>
  );
};

export default TimedSpeech;
