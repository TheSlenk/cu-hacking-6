import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSpeechToText from "./useSpeechToText";

const TimedSpeech = ({ data }) => {

  const decodeImage = (imageData, mimeType = 'image/png') => {
    if (typeof imageData === 'string') {
      // Strip unnecessary parts if they exist
      const base64Match = imageData.match(/([A-Za-z0-9+/=]+)$/);
      if (base64Match) {
        return `data:${mimeType};base64,${base64Match[1]}`;
      }
    }
  
    if (Array.isArray(imageData) || imageData instanceof Uint8Array) {
      const binaryString = new Uint8Array(imageData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      );
      const base64String = btoa(binaryString);
      return `data:${mimeType};base64,${base64String}`;
    }
  
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(imageData)) {
      const base64String = imageData.toString('base64');
      return `data:${mimeType};base64,${base64String}`;
    }
  
    console.warn('Unsupported image data type');
    return '';
  };
  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSpeaking = useSelector((state) => state.isSpeaking);
  const isPaused = useSelector((state) => state.isPaused);
  const dispatch = useDispatch();
  const { handleSpeak } = useSpeechToText();

  const speechInProgress = useRef(false);
  const timeoutRef = useRef(null);

  // Function to start the speech process
  const startSpeaking = () => {
    dispatch({ type: "SET_IS_SPEAKING", payload:   true });
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
      setCurrentIndex(0);
      // dispatch({ type: "SET_IS_SPEAKING", payload: false });
    }
  }, [currentIndex, data.length, dispatch]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
    {isSpeaking && (
      <div>
        {data[currentIndex]?.image && (
          <img src={decodeImage(data[currentIndex].image)} alt="image supposed to be here" />
        )}
        <p className="text-2xl text-white font-semibold">
          {data[currentIndex]?.text}
        </p>

      </div>
    )}
    </div>
  );
};

export default TimedSpeech;
