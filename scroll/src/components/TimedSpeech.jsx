import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSpeechToText from "./useSpeechToText";

const TimedSpeech = ({ data }) => {
  const decodeImage = (imageData, mimeType = 'image/png') => {
    if (typeof imageData === 'string') {
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

  // Reset state and Redux state on unmount
  useEffect(() => {
    return () => {
      setCurrentIndex(0);
      speechInProgress.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch({ type: "SET_IS_SPEAKING", payload: false });
      dispatch({ type: "SET_IS_PAUSED", payload: false });
    };
  }, [dispatch]);

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

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, data, isSpeaking, isPaused]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
      {isSpeaking && (
        <div>
          {data[currentIndex]?.image && (
            <img src={decodeImage(data[currentIndex].image)} alt="image supposed to be here" />
          )}
          <p className="text-2xl text-white font-semibold text-outline">
            {data[currentIndex]?.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimedSpeech;