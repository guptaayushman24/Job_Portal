import { useState } from "react";
import { useContext } from "react";
import VoiceRecorder from "./Voice_Record";
import { UserContext } from "../Context/Context";
import './HR_Interview.css'
const HRInterview = () => {
  const [index, setindex] = useState(0);
  const { setcontextindex } = useContext(UserContext);
  const {setscore} = useContext(UserContext)
  const context = useContext(UserContext);
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

  function movetonextquestion() {
    console.log("Move to the next question")
    if (index>=questions.length){
      alert("You have explore all the questions");
    }
    else{
      setindex(index + 1)
      setcontextindex(index)
      setscore("Please wait for your score score will range from 0 to 10")
    }
  }
  return (
    <div className="parent">
      <div className="heading">
        <h2>Prepare for the HR Interview with AI</h2>
        <p>Question</p>
        <p>{questions[index]}</p>
      </div>

      <div className="interviewdivparent">
        <div className="interviewdiv">
          Press on the microphone icon and start giving your answer and after  completion press on the stop button
        </div>
      </div>
      <div className="scoreparent">
       
        <div className="score">
          Your Score is:- {context.score || "Please wait for your score score will range from 0 to 10"}
        </div>
      </div>

      <div>
        <VoiceRecorder></VoiceRecorder>
      </div>

      <div className="nextquestionparent">
        <button className="nextquestion" onClick={movetonextquestion}>Move To Next Question</button>
      </div>
    </div>
  )
}
export default HRInterview
