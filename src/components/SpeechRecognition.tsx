import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../styles/record.css";
import { FC, useEffect, useState } from "react";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
interface SpeechRecognitionComponentProps {
  onChange: (val: string) => void;
  isEnabled?: boolean;
}
const SpeechRecognitionComponent: FC<SpeechRecognitionComponentProps> = ({
  onChange,
  isEnabled = false,
}) => {
  const [recordIcon, setRecordIcon] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  useEffect(() => {
    onChange(transcript);
  }, [transcript,onChange]);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetTranscript();
  };
  const onToggleListening = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecordIcon((prev) => {
      if (!prev) {
        SpeechRecognition.startListening({
          continuous: true,
        });
      } else {
        SpeechRecognition.stopListening();
      }
      return !prev;
    });
  };
  return (
    <div className={`flex items-center justify-between gap-1`}>
      <button
        id="micButton"
        className={`mic-button bg-red-600 ${recordIcon && "recording"} ${
          !isEnabled && "cursor-not-allowed"
        }`}
        disabled={!isEnabled}
        onClick={(e) => onToggleListening(e)}
      >
        {recordIcon ? (
          <IoMdMic size={25} color="white" />
        ) : (
          <IoMdMicOff size={25} color="white" />
        )}
      </button>
      <button
        onClick={(e) => onReset(e)}
        className={`mic-button bg-[#007bff] ${
          !isEnabled && "opacity-55 cursor-not-allowed"
        }`}
        disabled={!isEnabled}
      >
        <RiResetLeftFill color="white" size={25} />
      </button>
    </div>
  );
};
export default SpeechRecognitionComponent;
