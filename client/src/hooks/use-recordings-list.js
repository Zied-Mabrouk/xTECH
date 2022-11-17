import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key";

export default function useRecordingsList(audio,blob) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings([{ key: generateKey(), audio,blob }]);
  }, [audio,blob]);

  return {
    recordings,
    setRecordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
  };
}
