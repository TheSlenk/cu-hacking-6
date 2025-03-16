import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSpeechToText from "./useSpeechToText";

const TimedSpeech = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSpeaking = useSelector((state) => state.isSpeaking);
  const dispatch = useDispatch();
  const { handleSpeak } = useSpeechToText();

  const speechInProgress = useRef(false); // Ref to track speech progress

  // Function to start the speech process
  const startSpeaking = () => {
    dispatch({ type: "SET_IS_SPEAKING", payload: true });
    setCurrentIndex(0); // Start from the beginning
  };

  // Effect to manage speaking and progressing through the data
  useEffect(() => {
    // Exit if not speaking or if all items have been spoken
    if (!isSpeaking || currentIndex >= data.length || speechInProgress.current) return;

    const currentText = data[currentIndex].text;
    console.log("Speaking:", currentText);
    handleSpeak(currentText);
    speechInProgress.current = true; // Mark speech as in progress

    const previousTime = data[currentIndex - 1]?.time || 0;
    const delay = (data[currentIndex].time - previousTime) * 1000 || 2000;

    // Progress the index and reset the speech status after the delay
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next text
      speechInProgress.current = false; // Mark speech as completed
    }, delay);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [currentIndex, data, handleSpeak, isSpeaking]);

  useEffect(() => {
    if (currentIndex >= data.length) {
      dispatch({ type: "SET_IS_SPEAKING", payload: false }); // Set isSpeaking to false when done
    }
  }, [currentIndex, data.length, dispatch]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
      {isSpeaking && <p className="text-lg font-semibold mb-4">{data[currentIndex]?.text}</p>}
      {!isSpeaking && (
        <button onClick={startSpeaking} className="bg-blue-500 text-white p-2 rounded">
          Start Speaking
        </button>
      )}
    </div>
  );
};

export default TimedSpeech;
