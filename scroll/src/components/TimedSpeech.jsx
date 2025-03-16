import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSpeechToText from "./useSpeechToText";

const TimedSpeech = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSpeaking = useSelector((state) => state.isSpeaking);
  const isPaused = useSelector((state) => state.isPaused);
  const dispatch = useDispatch();
  const { handleSpeak } = useSpeechToText();

  const speechInProgress = useRef(false);
  const timeoutRef = useRef(null);

  // Function to start the speech process
  const startSpeaking = () => {
    dispatch({ type: "SET_IS_SPEAKING", payload: true });
    dispatch({ type: "SET_IS_PAUSED", payload: false });
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (!isSpeaking || currentIndex >= data.length) return;

    if (isPaused) {
      clearTimeout(timeoutRef.current);
      return;
    }

    if (!speechInProgress.current) {
      const currentText = data[currentIndex]?.text;
      if (currentText) {
        console.log("Speaking:", currentText);
        handleSpeak(currentText);
      }
      speechInProgress.current = true;
    }

    const previousTime = data[currentIndex - 1]?.time || 0;
    const delay = (data[currentIndex]?.time - previousTime) * 1000 || 2000;

    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        speechInProgress.current = false;
      }
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, data, handleSpeak, isSpeaking, isPaused]);

  useEffect(() => {
    if (!isPaused && isSpeaking) {
      speechInProgress.current = false; // Ensure speech resumes immediately
      setCurrentIndex((prevIndex) => prevIndex); // Force rerender to re-trigger effect
    }
  }, [isPaused, isSpeaking]);

  useEffect(() => {
    if (currentIndex >= data.length) {
      dispatch({ type: "SET_IS_SPEAKING", payload: false });
    }
  }, [currentIndex, data.length, dispatch]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
      {isSpeaking && <p className="text-lg font-semibold mb-4">{data[currentIndex]?.text}</p>}
    </div>
  );
};

export default TimedSpeech;
