import { formatMinutes, formatSeconds } from "../../../utils/format-time";
import { FaTimes, FaSave, FaMicrophone } from "react-icons/fa";
import "./styles.scss";

export default function RecorderControls({ recorderState, handlers }) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-container">
      <div className="recorder-display">
        <div className="recording-time">
          <div className={"recording-indicator"+(initRecording?" active":"")}></div>
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
        <div className={"cancel-button-container"+(initRecording?"":" active")}>
          <button className="cancel-button" title="Cancel recording">
            {initRecording && <FaTimes onClick={cancelRecording} />}
          </button>
        </div>
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <button
            className="start-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <FaSave />
          </button>
        ) : (
          <button
            className="start-button"
            title="Start recording"
            onClick={startRecording}
          >
            <FaMicrophone />
          </button>
        )}
      </div>
    </div>
  );
}
