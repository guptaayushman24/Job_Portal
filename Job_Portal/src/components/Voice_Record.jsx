import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone ,faStop} from '@fortawesome/free-solid-svg-icons';
import './Voice_Recorder.css'
import { UserContext } from "../Context/Context";
const VoiceRecorder = () => {
   const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const [response,setresponse] = useState('');
  const [nextquestion,setnextquestion] = useState('');
  const contextindex = useContext(UserContext);
  // Context
  const {setscore} = useContext(UserContext);
  const questions = [
    "Tell me about yourself ?",
    "Why should we hire you?",
    "Can you work under pressure?",
    "How do you deal with conflict?",
    "How do you handle stress ?",
    "Why this role attract you ?",
    "Would you lie for the company ?",
    "What are your strengths ?",
    "What are your weaknesses ?",
    "Do you have any questions?",

  ];

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

  useEffect(()=>{
    if (response!=null){
      setresponse(response);
      console.log(response);
    }
  },[response])

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

  const stopRecording = async () => {
    alert("You response has been recorded")
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      console.log(questions[contextindex.contextindex])
      try {
        const response = await fetch("http://127.0.0.1:8000/questions/question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",  // Correct way to set headers
              "Accept": "application/json"
          },
            body: JSON.stringify({
                question: questions[contextindex.contextindex] // Ensure it's correctly defined
                // question:'Tell me about yourself'
            })
        })
        .then(response=>response.json())
        .then(data=>{
          console.log("Score is",data.score);
          setscore(data.score);
        })
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
    
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("Error:", error);
    }
    }
  };



  return (
   <div className="parent">
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

   </div>
  );
};

export default VoiceRecorder;
