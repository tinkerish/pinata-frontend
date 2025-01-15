import "../styles/record.css";
import { FC, useEffect, useRef, useState } from "react";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
interface SpeechRecognitionComponentProps {
  onChange: (val: string, name: string) => void;
  value: string;
  error?: string;
  index: number;
}
const SpeechRecognitionComponent: FC<SpeechRecognitionComponentProps> = ({
  value,
  onChange,
  error,
  index,
}) => {
  const [recordIcon, setRecordIcon] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage("Speech Recognition is not supported in this browser.");
      return;
    }
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = "en-US";
    recognitionRef.current = recognitionInstance;
  }, []);
  useEffect(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.onresult = (event) => {
      const resultIndex = event.resultIndex;
      const currentTranscription = event.results[resultIndex][0].transcript;
      const updatedValue = value + " " + currentTranscription;
      onChange(updatedValue, "instruction");
    };
  }, [onChange, value]);
  const toggleListening = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecordIcon((prev) => {
      if (!recognitionRef.current) return prev;
      if (!prev) {
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
      }
      return !prev;
    });
  };

  return (
    <div className={`flex flex-col gap-1 w-full`}>
      <div className="flex items-center border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-full justify-between">
        <input
          type="text"
          id="instruction"
          name="instruction"
          value={value}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
          className="w-[95%] outline-none"
          disabled={recordIcon}
          aria-disabled={recordIcon}
          aria-label="Instruction"
          aria-invalid={!!error}
          aria-describedby={error ? `instruction-error-${index}` : undefined}
        />
        <button
          id="micButton"
          className={`w-fit mic-button bg-red-600 ${recordIcon && "recording"}`}
          onClick={(e) => toggleListening(e)}
        >
          {recordIcon ? (
            <IoMdMic size={40} color="white" />
          ) : (
            <IoMdMicOff size={20} color="white" />
          )}
        </button>
      </div>
    </div>
  );
};
export default SpeechRecognitionComponent;
