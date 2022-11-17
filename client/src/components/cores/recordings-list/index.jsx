import useRecordingsList from "../../../hooks/use-recordings-list";
import "./styles.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

export default function RecordingsList({ audio,onSendAudio,blob,setDisplayRecorder,cancelRecording }) {
  const { recordings, deleteAudio } = useRecordingsList(audio,blob);
 
  function blobToBase64(blob) {
    blob = new Blob([blob], { type: "audio/mp3" });
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      
      reader.readAsDataURL(blob);
    });
  }
  const onSendClicked = async(content)=>{
    const data = await blobToBase64(content.blob);
    setDisplayRecorder(false);
    cancelRecording();
  
    onSendAudio(data);
    
  }
  
  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                 <div className="button-container">
                <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                    >
                    <BsFillTrashFill />
                  </button>
                    </div>
                <audio controls src={record.audio} />
                <div className="button-container">
                  
                  <button className="button" onClick={()=>{
                    onSendClicked(record);
                    deleteAudio(record.key);
                  }}>
                    <AiOutlineSend/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-records">
          <FaExclamationCircle />
          <span>You don't have records</span>
        </div>
      )}
    </div>
  );
}
