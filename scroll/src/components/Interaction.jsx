import { useEffect, useState } from "react";
import useSpeechToText from "../components/useSpeechToText";

const TimedSpeech = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleSpeak } = useSpeechToText();

  useEffect(() => {
    if (currentIndex >= data.length) return; // Stop when reaching the last item

    console.log("Speaking:", data[currentIndex].text);
    handleSpeak(data[currentIndex].text);

    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, data[currentIndex].time * 1000);

    return () => clearTimeout(timeout); // Cleanup previous timeout
  }, [currentIndex, data, handleSpeak]);

  return (
    <div className="flex flex-col items-center p-4 text-center">
      <p className="text-lg font-semibold mb-4">{data[currentIndex]?.text}</p>
    </div>
  );
};

export default TimedSpeech;
