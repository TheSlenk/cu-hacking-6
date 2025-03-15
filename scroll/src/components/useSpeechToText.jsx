const useSpeechToText = () => {
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Speech synthesis is not supported by your browser.');
        }
    };

    return { handleSpeak };
};

export default useSpeechToText;