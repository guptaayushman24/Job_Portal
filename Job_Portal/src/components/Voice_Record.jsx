import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone ,faStop} from '@fortawesome/free-solid-svg-icons';
import './Voice_Recorder.css'
const VoiceRecorder = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    async function getMicrophone() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
    getMicrophone();
  }, []);

  const startRecording = () => {
    alert("Recording has been started")
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream);
      let chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async() => {
        const audioBlob = new Blob(chunks, { type: "file/.mp3" });
        const formData = new FormData();
        formData.append("file",audioBlob,"recording.mp3");

        // Sending the audio file to the backend
        try{
          const response = await axios.post('http://localhost:5000/uploadmp3file',formData,{
            'headers':{
              'Content-Type':'multipart/form-data',
            }
          });
          console.log("File uploded successfully",response);
        }
        catch(err){
          console.log('Error in file uploading',err);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    alert("You response has been recorded")
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };



  return (
    <div className="voicerecorderparent">
      <div className="buttonparent">
      <div className="playbutton">
      <FontAwesomeIcon icon={faMicrophone} onClick={startRecording} disabled={recording}/>
      </div>

      <div className="stopbutton">
      <FontAwesomeIcon icon={faStop} onClick={stopRecording} disabled={!recording}/>
      </div>
      </div>

    </div>
  );
};

export default VoiceRecorder;
